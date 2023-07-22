import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { StoriesService } from './stories.service'
import { Story } from './entities/story.entity'
import { FindManyStoryArgs, FindUniqueStoryArgs } from './dto/find.args'
import { CreateStoryInput } from './dto/create-story.input'
import { UpdateStoryInput } from './dto/update-story.input'
import {
  AllowAuthenticated,
  AllowAuthenticatedOptional,
  GetUser,
} from 'src/common/decorators/auth/auth.decorator'
import { MeilisearchService } from 'src/common/meilisearch/meilisearch.service'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { GetUserType } from '../../common/types'
import { checkRowLevelPermission } from 'src/common/guards'
import { Node } from '../nodes/entities/node.entity'
import { User } from '../users/entities/user.entity'
import { AggregateCountOutput } from 'src/common/dtos/common.input'
import { StoryWhereInput } from './dto/where.args'
import { UsersService } from '../users/users.service'
import { UserStory } from '../user-stories/entities/user-story.entity'

@Resolver(() => Story)
export class StoriesResolver {
  constructor(
    private readonly storiesService: StoriesService,
    private readonly meili: MeilisearchService,
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => Story)
  async createStory(
    @Args('createStoryInput') args: CreateStoryInput,
    @GetUser() user: GetUserType,
  ) {
    checkRowLevelPermission(user, args.authorId)
    // Check author
    const authorData = await this.usersService.createUserIfAbsent({
      uid: args.authorId,
    })

    const story = await this.storiesService.create(args)
    await this.meili.addToIndex([{ id: story.id, name: story.title }])
    return story
  }

  @Query(() => [Story], { name: 'stories' })
  findAll(
    @Args() { cursor, distinct, orderBy, skip, take, where }: FindManyStoryArgs,
    @Args('searchTerm', { nullable: true }) searchTerm: string,
  ) {
    return this.storiesService.findAll(
      { cursor, distinct, orderBy, skip, take, where },
      searchTerm,
    )
  }

  @Query(() => Story, { name: 'story' })
  findOne(@Args() args: FindUniqueStoryArgs) {
    return this.storiesService.findOne(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Story)
  async updateStory(
    @Args('updateStoryInput') args: UpdateStoryInput,
    @GetUser() user: GetUserType,
  ) {
    const story = await this.prisma.story.findUnique({ where: { id: args.id } })
    checkRowLevelPermission(user, story.authorId)
    return this.storiesService.update(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Story)
  async removeStory(
    @Args() args: FindUniqueStoryArgs,
    @GetUser() user: GetUserType,
  ) {
    const story = await this.prisma.story.findUnique(args)
    checkRowLevelPermission(user, story.authorId)
    return this.storiesService.remove(args)
  }

  @ResolveField(() => [Node], { nullable: true })
  nodes(@Parent() parent: Story) {
    return this.prisma.node.findMany({
      where: { storyId: parent.id },
    })
  }

  @ResolveField(() => User, { nullable: true })
  author(@Parent() parent: Story) {
    return this.prisma.user.findUnique({
      where: { uid: parent.authorId },
    })
  }

  @AllowAuthenticatedOptional()
  @ResolveField(() => UserStory, { nullable: true })
  userStory(@Parent() parent: Story, @GetUser() user: GetUserType) {
    if (!user?.uid) {
      return null
    }
    return this.prisma.userStory.findUnique({
      where: { uid_storyId: { storyId: parent.id, uid: user.uid } },
    })
  }

  @ResolveField(() => [Node], { nullable: true })
  startingNodes(@Parent() parent: Story) {
    return this.prisma.node.findMany({
      where: { storyId: parent.id, start: true },
    })
  }

  @Query(() => AggregateCountOutput, {
    name: 'storiesCount',
  })
  async storiesCount(
    @Args('where', { nullable: true })
    where: StoryWhereInput,
  ) {
    const stories = await this.prisma.story.aggregate({
      _count: { _all: true },
      where,
    })
    return { count: stories._count._all }
  }
}
