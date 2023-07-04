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
  GetUser,
} from 'src/common/decorators/auth/auth.decorator'
import { MeilisearchService } from 'src/common/meilisearch/meilisearch.service'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { GetUserType } from '@multiverse-org/types'
import { checkRowLevelPermission } from 'src/common/guards'
import { Node } from '../nodes/entities/node.entity'
import { User } from '../users/entities/user.entity'

@Resolver(() => Story)
export class StoriesResolver {
  constructor(
    private readonly storiesService: StoriesService,
    private readonly meili: MeilisearchService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => Story)
  async createStory(@Args('createStoryInput') args: CreateStoryInput) {
    const author = await this.prisma.user.findUnique({
      where: { uid: args.authorId },
    })
    if (!author?.uid) {
      const newAuthor = await this.prisma.user.create({
        data: { uid: args.authorId },
      })
    }
    const story = await this.storiesService.create(args)
    await this.meili.addToIndex([{ id: story.id, name: story.title }])
    return story
  }

  @Query(() => [Story], { name: 'stories' })
  findAll(
    @Args() args: FindManyStoryArgs,
    @Args('searchTerm', { nullable: true }) searchTerm: string,
  ) {
    return this.storiesService.findAll(args, searchTerm)
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
}
