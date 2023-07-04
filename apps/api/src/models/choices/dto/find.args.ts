import { ArgsType, Field, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { ChoiceOrderByWithRelationInput } from './orderBy.args'
import { ChoiceWhereInput, ChoiceWhereUniqueInput } from './where.args'
import { RestrictProperties } from 'src/common/dtos/common.input'

registerEnumType(Prisma.ChoiceScalarFieldEnum, {
  name: 'ChoiceScalarFieldEnum',
})

@ArgsType()
export class FindManyChoiceArgs
  implements
    RestrictProperties<
      FindManyChoiceArgs,
      Omit<Prisma.ChoiceFindManyArgs, 'include' | 'select'>
    >
{
  @Field(() => ChoiceWhereInput, { nullable: true })
  where: ChoiceWhereInput
  @Field(() => [ChoiceOrderByWithRelationInput], { nullable: true })
  orderBy: ChoiceOrderByWithRelationInput[]
  @Field(() => ChoiceWhereUniqueInput, { nullable: true })
  cursor: ChoiceWhereUniqueInput
  @Field(() => Number, { nullable: true })
  take: number
  @Field(() => Number, { nullable: true })
  skip: number
  @Field(() => [Prisma.ChoiceScalarFieldEnum], { nullable: true })
  distinct: Prisma.ChoiceScalarFieldEnum[]
}

@ArgsType()
export class FindUniqueChoiceArgs {
  @Field({ nullable: true })
  where: ChoiceWhereUniqueInput
}
