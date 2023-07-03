import { ArgsType, Field, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import NodeOrderByWithRelationInput from './orderBy.args'
import { NodeWhereInput, NodeWhereUniqueInput } from './where.args'
import { RestrictProperties } from 'src/common/dtos/common.input'

registerEnumType(Prisma.NodeScalarFieldEnum, {
  name: 'NodeScalarFieldEnum',
})

@ArgsType()
export class FindManyNodeArgs
  implements
    RestrictProperties<
      FindManyNodeArgs,
      Omit<Prisma.NodeFindManyArgs, 'include' | 'select'>
    >
{
  @Field(() => NodeWhereInput, { nullable: true })
  where: NodeWhereInput
  @Field(() => [NodeOrderByWithRelationInput], { nullable: true })
  orderBy: NodeOrderByWithRelationInput[]
  @Field(() => NodeWhereUniqueInput, { nullable: true })
  cursor: NodeWhereUniqueInput
  @Field(() => Number, { nullable: true })
  take: number
  @Field(() => Number, { nullable: true })
  skip: number
  @Field(() => [Prisma.NodeScalarFieldEnum], { nullable: true })
  distinct: Prisma.NodeScalarFieldEnum[]
}

@ArgsType()
export class FindUniqueNodeArgs {
  @Field({ nullable: true })
  where: NodeWhereUniqueInput
}
