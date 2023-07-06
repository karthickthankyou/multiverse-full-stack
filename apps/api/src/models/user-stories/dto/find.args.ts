import { ArgsType, Field, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { UserStoryOrderByWithRelationInput } from './orderBy.args'
import { UserStoryWhereInput, UserStoryWhereUniqueInput } from './where.args'
import { RestrictProperties } from 'src/common/dtos/common.input'

registerEnumType(Prisma.UserStoryScalarFieldEnum, {
  name: 'UserStoryScalarFieldEnum',
})

@ArgsType()
export class FindManyUserStoryArgs
  implements
    RestrictProperties<
      FindManyUserStoryArgs,
      Omit<Prisma.UserStoryFindManyArgs, 'include' | 'select'>
    >
{
  @Field(() => UserStoryWhereInput, { nullable: true })
  where: UserStoryWhereInput
  @Field(() => [UserStoryOrderByWithRelationInput], { nullable: true })
  orderBy: UserStoryOrderByWithRelationInput[]
  @Field(() => UserStoryWhereUniqueInput, { nullable: true })
  cursor: UserStoryWhereUniqueInput
  @Field(() => Number, { nullable: true })
  take: number
  @Field(() => Number, { nullable: true })
  skip: number
  @Field(() => [Prisma.UserStoryScalarFieldEnum], { nullable: true })
  distinct: Prisma.UserStoryScalarFieldEnum[]
}

@ArgsType()
export class FindUniqueUserStoryArgs {
  @Field({ nullable: true })
  where: UserStoryWhereUniqueInput
}
