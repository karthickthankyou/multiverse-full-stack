import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { NodesService } from './nodes.service'
import { Node } from './entities/node.entity'
import { FindManyNodeArgs, FindUniqueNodeArgs } from './dto/find.args'
import { CreateNodeInput } from './dto/create-node.input'
import { UpdateNodeInput } from './dto/update-node.input'

@Resolver(() => Node)
export class NodesResolver {
  constructor(private readonly nodesService: NodesService) {}

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

  @Mutation(() => Node)
  updateNode(@Args('updateNodeInput') args: UpdateNodeInput) {
    return this.nodesService.update(args)
  }

  @Mutation(() => Node)
  removeNode(@Args() args: FindUniqueNodeArgs) {
    return this.nodesService.remove(args)
  }
}
