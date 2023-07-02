import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { StoriesService } from './stories.service'
import { Story } from './entities/story.entity'
import { FindManyStoryArgs, FindUniqueStoryArgs } from './dto/find.args'
import { CreateStoryInput } from './dto/create-story.input'
import { UpdateStoryInput } from './dto/update-story.input'

@Resolver(() => Story)
export class StoriesResolver {
  constructor(private readonly storiesService: StoriesService) {}

  @Mutation(() => Story)
  createStory(@Args('createStoryInput') args: CreateStoryInput) {
    return this.storiesService.create(args)
  }

  @Query(() => [Story], { name: 'stories' })
  findAll(@Args() args: FindManyStoryArgs) {
    return this.storiesService.findAll(args)
  }

  @Query(() => Story, { name: 'story' })
  findOne(@Args() args: FindUniqueStoryArgs) {
    return this.storiesService.findOne(args)
  }

  @Mutation(() => Story)
  updateStory(@Args('updateStoryInput') args: UpdateStoryInput) {
    return this.storiesService.update(args)
  }

  @Mutation(() => Story)
  removeStory(@Args() args: FindUniqueStoryArgs) {
    return this.storiesService.remove(args)
  }
}
