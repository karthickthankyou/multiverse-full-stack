import { InputType, PickType } from '@nestjs/graphql'
import { UserStory } from '../entities/user-story.entity'

@InputType()
export class CreateUserStoryInput extends PickType(
  UserStory,
  ['storyId', 'uid', 'type'],
  InputType,
) {}
