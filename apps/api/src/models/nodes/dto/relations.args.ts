import { Field, InputType } from '@nestjs/graphql'
import { NodeWhereInput } from './where.args'
import type { NodeWhereInput as NodeWhereInputType } from './where.args'

@InputType()
export class NodeRelationFilter {
  @Field(() => NodeWhereInput, { nullable: true })
  is: NodeWhereInputType

  @Field(() => NodeWhereInput, { nullable: true })
  isNot: NodeWhereInputType
}

@InputType()
export class NodeListRelationFilter {
  @Field(() => NodeWhereInput, { nullable: true })
  every: NodeWhereInputType
  @Field(() => NodeWhereInput, { nullable: true })
  some: NodeWhereInputType
  @Field(() => NodeWhereInput, { nullable: true })
  none: NodeWhereInputType
}
