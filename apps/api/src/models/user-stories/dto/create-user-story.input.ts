import { Field, InputType, PickType, registerEnumType } from '@nestjs/graphql'
import { UserStory } from '../entities/user-story.entity'
import { UserStoryType } from '@prisma/client'

export enum SelectedUserStoryType {
  WISHLISTED,
  IN_CART,
}

registerEnumType(SelectedUserStoryType, {
  name: 'SelectedUserStoryType',
})

@InputType()
export class CreateUserStoryInput extends PickType(
  UserStory,
  ['storyId', 'uid'],
  InputType,
) {
  @Field(() => SelectedUserStoryType)
  type: SelectedUserStoryType
}
