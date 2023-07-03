import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql'
import { NodesService } from './nodes.service'
import { Node } from './entities/node.entity'
import { FindManyNodeArgs, FindUniqueNodeArgs } from './dto/find.args'
import { CreateNodeInput } from './dto/create-node.input'
import { UpdateNodeInput } from './dto/update-node.input'
import {
  AllowAuthenticated,
  GetUser,
} from 'src/common/decorators/auth/auth.decorator'
import { GetUserType } from '@multiverse-org/types'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { checkRowLevelPermission } from 'src/common/guards'

import { User } from '../users/entities/user.entity'
import { Story } from '../stories/entities/story.entity'
import { AggregateCountOutput } from 'src/common/dtos/common.input'
import { NodeWhereInput } from './dto/where.args'

@Resolver(() => Node)
export class NodesResolver {
  constructor(
    private readonly nodesService: NodesService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => Node)
  createNode(@Args('createNodeInput') args: CreateNodeInput) {
    return this.nodesService.create(args)
  }

  @Query(() => [Node], { name: 'nodes' })
  findAll(@Args() args: FindManyNodeArgs) {
    return this.nodesService.findAll(args)
  }

  @Query(() => Node, { name: 'node' })
  findOne(@Args() args: FindUniqueNodeArgs) {
    return this.nodesService.findOne(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Node)
  async updateNode(
    @Args('updateNodeInput') args: UpdateNodeInput,
    @GetUser() user: GetUserType,
  ) {
    const node = await this.prisma.node.findUnique({ where: { id: args.id } })
    checkRowLevelPermission(user, node.authorId)
    return this.nodesService.update(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Node)
  async removeNode(
    @Args() args: FindUniqueNodeArgs,
    @GetUser() user: GetUserType,
  ) {
    const node = await this.prisma.node.findUnique(args)
    checkRowLevelPermission(user, node.authorId)
    return this.nodesService.remove(args)
  }

  @Query(() => AggregateCountOutput, {
    name: 'nodesCount',
  })
  async nodesCount(
    @Args('where', { nullable: true })
    where: NodeWhereInput,
  ) {
    const nodes = await this.prisma.node.aggregate({
      _count: { _all: true },
      where,
    })
    return { count: nodes._count._all }
  }

  @ResolveField(() => User, { nullable: true })
  author(@Parent() parent: Story) {
    return this.prisma.user.findUnique({
      where: { uid: parent.authorId },
    })
  }

  @ResolveField(() => Story, { nullable: true })
  story(@Parent() parent: Node) {
    return this.prisma.story.findUnique({
      where: { id: parent.storyId },
    })
  }

  @ResolveField(() => [Node], { nullable: true })
  parentNodes(@Parent() parent: Node) {
    return this.prisma.node.findMany({
      where: {
        childNodes: {
          some: {
            id: parent.id,
          },
        },
      },
    })
  }

  @ResolveField(() => [Node], { nullable: true })
  childNodes(@Parent() parent: Node) {
    return this.prisma.node.findMany({
      where: {
        parentNodes: {
          some: {
            id: parent.id,
          },
        },
      },
    })
  }
}
