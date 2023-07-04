import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import {
  DateTimeFilter,
  IntFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input'
import { NodeRelationFilter } from 'src/models/nodes/dto/relations.args'

@InputType()
export class ChoiceParentNodeIdChoiceNodeIdCompoundUniqueInput {
  parentNodeId: number
  choiceNodeId: number
}

@InputType()
export class ChoiceWhereUniqueInput
  implements
    RestrictProperties<ChoiceWhereUniqueInput, Prisma.ChoiceWhereUniqueInput>
{
  @Field(() => ChoiceParentNodeIdChoiceNodeIdCompoundUniqueInput, {
    nullable: true,
  })
  parentNodeId_choiceNodeId: ChoiceParentNodeIdChoiceNodeIdCompoundUniqueInput
  @Field(() => Number, { nullable: true })
  id: number
}

@InputType()
export class ChoiceWhereInput
  implements RestrictProperties<ChoiceWhereInput, Prisma.ChoiceWhereInput>
{
  @Field(() => IntFilter, { nullable: true })
  id: IntFilter
  @Field(() => DateTimeFilter, { nullable: true })
  createdAt: DateTimeFilter
  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt: DateTimeFilter
  @Field(() => StringFilter, { nullable: true })
  choiceText: StringFilter
  @Field(() => IntFilter, { nullable: true })
  parentNodeId: IntFilter
  @Field(() => IntFilter, { nullable: true })
  choiceNodeId: IntFilter
  @Field(() => NodeRelationFilter, { nullable: true })
  parentNode: NodeRelationFilter
  @Field(() => NodeRelationFilter, { nullable: true })
  choiceNode: NodeRelationFilter

  @Field(() => [ChoiceWhereInput], { nullable: true })
  AND: ChoiceWhereInput[]
  @Field(() => [ChoiceWhereInput], { nullable: true })
  OR: ChoiceWhereInput[]
  @Field(() => [ChoiceWhereInput], { nullable: true })
  NOT: ChoiceWhereInput[]
}

@InputType()
export class ChoiceListRelationFilter {
  @Field(() => ChoiceWhereInput, { nullable: true })
  every: ChoiceWhereInput
  @Field(() => ChoiceWhereInput, { nullable: true })
  some: ChoiceWhereInput
  @Field(() => ChoiceWhereInput, { nullable: true })
  none: ChoiceWhereInput
}

@InputType()
export class ChoiceRelationFilter {
  @Field(() => ChoiceWhereInput, { nullable: true })
  is: ChoiceWhereInput
  @Field(() => ChoiceWhereInput, { nullable: true })
  isNot: ChoiceWhereInput
}
