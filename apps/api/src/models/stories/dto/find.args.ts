import { ArgsType, Field, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { StoryOrderByWithRelationInput } from './orderBy.args'
import { StoryWhereInput, StoryWhereUniqueInput } from './where.args'
import { RestrictProperties } from 'src/common/dtos/common.input'

registerEnumType(Prisma.StoryScalarFieldEnum, {
  name: 'StoryScalarFieldEnum',
})

@ArgsType()
export class FindManyStoryArgs
  implements
    RestrictProperties<
      FindManyStoryArgs,
      Omit<Prisma.StoryFindManyArgs, 'include' | 'select'>
    >
{
  @Field(() => StoryWhereInput, { nullable: true })
  where: StoryWhereInput
  @Field(() => [StoryOrderByWithRelationInput], { nullable: true })
  orderBy: StoryOrderByWithRelationInput[]
  @Field(() => StoryWhereUniqueInput, { nullable: true })
  cursor: StoryWhereUniqueInput
  @Field(() => Number, { nullable: true })
  take: number
  @Field(() => Number, { nullable: true })
  skip: number
  @Field(() => [Prisma.StoryScalarFieldEnum], { nullable: true })
  distinct: Prisma.StoryScalarFieldEnum[]
}

@ArgsType()
export class FindUniqueStoryArgs {
  @Field({ nullable: true })
  where: StoryWhereUniqueInput
}
