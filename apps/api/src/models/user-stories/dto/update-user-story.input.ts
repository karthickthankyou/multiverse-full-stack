import { CreateUserStoryInput } from './create-user-story.input'
import { Field, InputType, PartialType } from '@nestjs/graphql'
import { UserStoryUidStoryIdCompoundUniqueInput } from './where.args'

@InputType()
export class UpdateUserStoryInput extends PartialType(CreateUserStoryInput) {
  @Field(() => UserStoryUidStoryIdCompoundUniqueInput, { nullable: true })
  uid_storyId: UserStoryUidStoryIdCompoundUniqueInput
}
