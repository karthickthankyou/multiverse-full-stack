import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { StoriesService } from './stories.service'
import { Story } from './entities/story.entity'
import { FindManyStoryArgs, FindUniqueStoryArgs } from './dto/find.args'
import { CreateStoryInput } from './dto/create-story.input'
import { UpdateStoryInput } from './dto/update-story.input'
import { AllowAuthenticated } from 'src/common/decorators/auth/auth.decorator'
import { MeilisearchService } from 'src/common/meilisearch/meilisearch.service'

@Resolver(() => Story)
export class StoriesResolver {
  constructor(
    private readonly storiesService: StoriesService,
    private readonly meili: MeilisearchService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => Story)
  async createStory(@Args('createStoryInput') args: CreateStoryInput) {
    const story = await this.storiesService.create(args)
    await this.meili.addToIndex([{ id: story.id, name: story.title }])
    return story
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
