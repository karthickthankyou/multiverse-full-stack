import { CreateStoryInput } from './create-story.input'
import { InputType, PartialType } from '@nestjs/graphql'
import { Story } from '@prisma/client'

@InputType()
export class UpdateStoryInput extends PartialType(CreateStoryInput) {
  id: Story['id']
}
