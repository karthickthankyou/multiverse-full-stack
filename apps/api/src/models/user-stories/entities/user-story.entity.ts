import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import {
  UserStoryType as UserStoryTypeEnum,
  UserStory as UserStoryType,
} from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

registerEnumType(UserStoryTypeEnum, {
  name: 'UserStoryType',
})

@ObjectType()
export class UserStory implements RestrictProperties<UserStory, UserStoryType> {
  createdAt: Date
  updatedAt: Date
  uid: string
  storyId: number
  @Field(() => UserStoryTypeEnum, { nullable: true })
  type: UserStoryTypeEnum
  // Todo fill all properties. To make it nullable add below.
  // @Field(() => String, { nullable: true })
}
