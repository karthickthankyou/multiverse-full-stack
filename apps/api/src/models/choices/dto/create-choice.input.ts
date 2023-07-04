import { Field, InputType, PickType } from '@nestjs/graphql'
import { Choice } from '../entities/choice.entity'

@InputType()
export class CreateChoiceInput extends PickType(
  Choice,
  ['choiceNodeId', 'parentNodeId', 'choiceText'],
  InputType,
) {}

@InputType()
export class CreateManyChoiceInput {
  @Field(() => [CreateChoiceInput])
  choices: CreateChoiceInput[]
}
