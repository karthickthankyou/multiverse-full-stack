import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { ChoicesService } from './choices.service'
import { Choice } from './entities/choice.entity'
import { FindManyChoiceArgs, FindUniqueChoiceArgs } from './dto/find.args'
import {
  CreateChoiceInput,
  CreateManyChoiceInput,
} from './dto/create-choice.input'
import { UpdateChoiceInput } from './dto/update-choice.input'
import {
  AllowAuthenticated,
  GetUser,
} from 'src/common/decorators/auth/auth.decorator'
import { Node } from '../nodes/entities/node.entity'

import { PrismaService } from 'src/common/prisma/prisma.service'
import { GetUserType } from '@multiverse-org/types'
import { checkRowLevelPermission } from 'src/common/guards'
import { BadRequestException } from '@nestjs/common'

@Resolver(() => Choice)
export class ChoicesResolver {
  constructor(
    private readonly choicesService: ChoicesService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => Choice)
  async createChoice(
    @Args('createChoiceInput') args: CreateChoiceInput,
    @GetUser() user: GetUserType,
  ) {
    const parentNode = await this.prisma.node.findUnique({
      where: { id: args.parentNodeId },
    })

    checkRowLevelPermission(user, parentNode.authorId)

    return this.choicesService.create(args)
  }

  @AllowAuthenticated()
  @Mutation(() => [Choice])
  async createManyChoices(
    @Args('createManyChoiceInput') args: CreateManyChoiceInput,
    @GetUser() user: GetUserType,
  ) {
    const uniqueParentNodeIds = [
      ...new Set(args.choices.map((choice) => choice.parentNodeId)),
    ]

    if (uniqueParentNodeIds.length > 1) {
      throw new BadRequestException(
        'Can not create choices for multiple parent nodes.',
      )
    }

    const parentNodeId = uniqueParentNodeIds[0]
    const parentNode = await this.prisma.node.findUnique({
      where: { id: parentNodeId },
    })

    checkRowLevelPermission(user, parentNode.authorId)

    // For simplicity, we delete all the choices for the parentNode before adding the new set.
    await this.prisma.choice.deleteMany({ where: { parentNodeId } })

    const choices = await Promise.all(
      args.choices.map((choice) => this.prisma.choice.create({ data: choice })),
    )
    console.log(' choices ', choices)
    return choices
  }

  @Query(() => [Choice], { name: 'choices' })
  findAll(@Args() args: FindManyChoiceArgs) {
    return this.choicesService.findAll(args)
  }

  @Query(() => Choice, { name: 'choice' })
  findOne(@Args() args: FindUniqueChoiceArgs) {
    return this.choicesService.findOne(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Choice)
  async updateChoice(
    @Args('updateChoiceInput') args: UpdateChoiceInput,
    @GetUser() user: GetUserType,
  ) {
    const choice = await this.prisma.choice.findUnique({
      where: { id: args.id },
      include: { parentNode: true },
    })

    checkRowLevelPermission(user, choice.parentNode.authorId)
    return this.choicesService.update(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Choice)
  async removeChoice(
    @Args() args: FindUniqueChoiceArgs,
    @GetUser() user: GetUserType,
  ) {
    const choice = await this.prisma.choice.findUnique({
      where: { id: args.where.id },
      include: { parentNode: true },
    })

    checkRowLevelPermission(user, choice.parentNode.authorId)
    return this.choicesService.remove(args)
  }

  @ResolveField(() => Node)
  parentNode(@Parent() parent: Choice) {
    return this.prisma.node.findUnique({
      where: { id: parent.parentNodeId },
    })
  }

  @ResolveField(() => Node)
  choiceNode(@Parent() parent: Choice) {
    return this.prisma.node.findUnique({
      where: { id: parent.choiceNodeId },
    })
  }
}
