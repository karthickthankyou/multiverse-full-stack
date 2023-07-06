import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { UserStoriesService } from './user-stories.service'
import { UserStory } from './entities/user-story.entity'
import { FindManyUserStoryArgs, FindUniqueUserStoryArgs } from './dto/find.args'
import { CreateUserStoryInput } from './dto/create-user-story.input'
import { UpdateUserStoryInput } from './dto/update-user-story.input'
import { UsersService } from '../users/users.service'
import {
  AllowAuthenticated,
  GetUser,
} from 'src/common/decorators/auth/auth.decorator'
import { GetUserType } from '@multiverse-org/types'
import { checkRowLevelPermission } from 'src/common/guards'
import { User } from '../users/entities/user.entity'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { Story } from '../stories/entities/story.entity'

@Resolver(() => UserStory)
export class UserStoriesResolver {
  constructor(
    private readonly userStoriesService: UserStoriesService,
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => UserStory)
  async createUserStory(
    @Args('createUserStoryInput') args: CreateUserStoryInput,
    @GetUser() user: GetUserType,
  ) {
    checkRowLevelPermission(user, args.uid)

    // Check user
    const userData = await this.usersService.createUserIfAbsent(args)

    return this.userStoriesService.create(args)
  }

  @AllowAuthenticated('admin')
  @Query(() => [UserStory], { name: 'userStories' })
  findAll(@Args() args: FindManyUserStoryArgs) {
    return this.userStoriesService.findAll(args)
  }

  @AllowAuthenticated()
  @Query(() => [UserStory], { name: 'userStories' })
  myUserStories(
    @Args('uid') uid: string,
    @Args()
    { cursor, distinct, orderBy, skip, take, where }: FindManyUserStoryArgs,
    @GetUser() user: GetUserType,
  ) {
    checkRowLevelPermission(user, uid)
    return this.userStoriesService.findAll({
      cursor,
      distinct,
      orderBy,
      skip,
      take,
      where: {
        ...where,
        uid: { equals: uid },
      },
    })
  }

  @Query(() => UserStory, { name: 'userStory' })
  findOne(@Args() args: FindUniqueUserStoryArgs) {
    return this.userStoriesService.findOne(args)
  }

  @AllowAuthenticated()
  @Mutation(() => UserStory)
  updateUserStory(
    @Args('updateUserStoryInput') args: UpdateUserStoryInput,
    @GetUser() user: GetUserType,
  ) {
    checkRowLevelPermission(user, args.uid)

    return this.userStoriesService.update(args)
  }

  @AllowAuthenticated()
  @Mutation(() => UserStory)
  removeUserStory(
    @Args() args: FindUniqueUserStoryArgs,
    @GetUser() user: GetUserType,
  ) {
    checkRowLevelPermission(user, args.where.uid_storyId.uid)
    return this.userStoriesService.remove(args)
  }

  @ResolveField(() => User, { nullable: true })
  user(@Parent() parent: UserStory) {
    return this.prisma.user.findUnique({
      where: { uid: parent.uid },
    })
  }

  @ResolveField(() => Story, { nullable: true })
  story(@Parent() parent: UserStory) {
    return this.prisma.story.findUnique({
      where: { id: parent.storyId },
    })
  }
}
