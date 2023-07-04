import { CreateChoiceInput } from './create-choice.input'
import { InputType, PartialType } from '@nestjs/graphql'
import { Choice } from '@prisma/client'

@InputType()
export class UpdateChoiceInput extends PartialType(CreateChoiceInput) {
  id: Choice['id']
}
