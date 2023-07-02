import { InputType, PickType } from '@nestjs/graphql'
import { Node } from '../entities/node.entity'

@InputType()
export class CreateNodeInput extends PickType(
  Node,
  ['authorId', 'content', 'end', 'start', 'storyId', 'title'],
  InputType,
) {}
