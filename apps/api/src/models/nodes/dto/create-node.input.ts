import { InputType, OmitType, PickType } from '@nestjs/graphql'
import { Node } from '../entities/node.entity'

@InputType()
export class CreateNodeInput extends PickType(
  Node,
  ['authorId', 'content', 'end', 'start', 'storyId', 'title', 'image'],
  InputType,
) {}

@InputType()
export class CreateNodeInputWithoutStory extends OmitType(
  CreateNodeInput,
  ['storyId'],
  InputType,
) {}
