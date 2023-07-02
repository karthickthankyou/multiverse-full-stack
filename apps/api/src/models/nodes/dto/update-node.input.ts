import { CreateNodeInput } from './create-node.input'
import { InputType, PartialType } from '@nestjs/graphql'
import { Node } from '@prisma/client'

@InputType()
export class UpdateNodeInput extends PartialType(CreateNodeInput) {
  id: Node['id']
}
