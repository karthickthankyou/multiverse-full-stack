import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { UsersService } from './users.service'
import { User } from './entities/user.entity'
import { FindManyUserArgs, FindUniqueUserArgs } from './dto/find.args'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import {
  AllowAuthenticated,
  GetUser,
} from 'src/common/decorators/auth/auth.decorator'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { Story } from '../stories/entities/story.entity'
import { GetUserType } from '@multiverse-org/types'
import { checkRowLevelPermission } from 'src/common/guards'

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => User)
  createUser(@Args('createUserInput') args: CreateUserInput) {
    return this.usersService.create(args)
  }

  @AllowAuthenticated('admin')
  @Query(() => [User], { name: 'users' })
  findAll(@Args() args: FindManyUserArgs) {
    return this.usersService.findAll(args)
  }

  @AllowAuthenticated()
  @Query(() => User, { name: 'user', nullable: true })
  findOne(@Args() args: FindUniqueUserArgs) {
    return this.usersService.findOne(args)
  }

  @AllowAuthenticated()
  @Mutation(() => User)
  updateUser(
    @Args('updateUserInput') args: UpdateUserInput,
    @GetUser() user: GetUserType,
  ) {
    checkRowLevelPermission(user, args.uid)
    return this.usersService.update(args)
  }

  @AllowAuthenticated()
  @Mutation(() => User)
  removeUser(@Args() args: FindUniqueUserArgs, @GetUser() user: GetUserType) {
    checkRowLevelPermission(user, args.where.uid)
    return this.usersService.remove(args)
  }

  @ResolveField(() => [Story], { nullable: true })
  stories(@Parent() parent: User) {
    return this.prisma.story.findMany({
      where: { authorId: parent.uid },
    })
  }
}
