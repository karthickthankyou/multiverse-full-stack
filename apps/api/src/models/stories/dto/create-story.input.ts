import { Field, InputType, PickType } from '@nestjs/graphql'
import { Story } from '../entities/story.entity'
import { CreateNodeInputWithoutStory } from 'src/models/nodes/dto/create-node.input'

@InputType()
export class CreateStoryInput extends PickType(
  Story,
  ['authorId', 'title', 'image', 'description'],
  InputType,
) {
  @Field(() => [CreateNodeInputWithoutStory])
  nodes: CreateNodeInputWithoutStory[]
}
