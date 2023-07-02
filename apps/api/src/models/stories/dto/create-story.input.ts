import { InputType, PickType } from '@nestjs/graphql'
import { Story } from '../entities/story.entity'

@InputType()
export class CreateStoryInput extends PickType(
  Story,
  ['authorId', 'title'],
  InputType,
) {}
