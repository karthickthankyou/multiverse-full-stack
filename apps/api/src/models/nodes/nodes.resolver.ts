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
import {
  CreateMultipleNodesInput,
  CreateNodeInput,
} from './dto/create-node.input'
import { UpdateNodeInput } from './dto/update-node.input'
import {
  AllowAuthenticated,
  GetUser,
} from 'src/common/decorators/auth/auth.decorator'
import { GetUserType } from '../../common/types'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { checkRowLevelPermission } from 'src/common/guards'

import { User } from '../users/entities/user.entity'
import { Story } from '../stories/entities/story.entity'
import { AggregateCountOutput } from 'src/common/dtos/common.input'
import { NodeWhereInput } from './dto/where.args'
import { Choice } from '../choices/entities/choice.entity'
import { BadRequestException } from '@nestjs/common'

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

  @AllowAuthenticated()
  @Mutation(() => [Node])
  createNodes(
    @Args('CreateMultipleNodesInput') args: CreateMultipleNodesInput,
  ) {
    return this.nodesService.createMany(args)
  }

  //   @AllowAuthenticated()
  //   @Mutation(() => Node)
  //   async addChildNodes(
  //     @Args('nodeId') nodeId: number,
  //     @Args({ name: 'childrenNodeIds', type: () => [Number] })
  //     childrenNodeIds: number[],
  //   ): Promise<Node> {
  //     const node = await this.prisma.node.findUnique({
  //       where: { id: nodeId },
  //       include: { childNodes: true },
  //     })

  //     // Get the ids of the current child nodes
  //     const currentChildNodeIds = node.childNodes.map((childNode) => childNode.id)

  //     return this.prisma.node.update({
  //       where: { id: nodeId },
  //       data: {
  //         childNodes: {
  //           disconnect: currentChildNodeIds.map((id) => ({ id })),
  //           connect: childrenNodeIds.map((id) => ({ id })),
  //         },
  //       },
  //     })
  //   }

  @Query(() => [Node], { name: 'nodes' })
  findAll(@Args() args: FindManyNodeArgs) {
    return this.nodesService.findAll(args)
  }

  @Query(() => Node, { name: 'node' })
  findOne(@Args() args: FindUniqueNodeArgs) {
    return this.nodesService.findOne(args)
  }
  @Query(() => String, { name: 'sentryTesting' })
  sentryTesting() {
    throw new BadRequestException('Testing sentry')
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

  //   @ResolveField(() => [Choice], { nullable: true })
  //   parentNodes(@Parent() parent: Node) {
  //     return this.prisma.choice.findMany({
  //       where: { choiceNodeId: parent.id },
  //     })
  //   }

  @ResolveField(() => [Choice], { nullable: true })
  choices(@Parent() parent: Node) {
    return this.prisma.choice.findMany({
      where: { parentNodeId: parent.id },
    })
  }
}
