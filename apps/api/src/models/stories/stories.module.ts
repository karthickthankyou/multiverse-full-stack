import { Module } from '@nestjs/common'
import { StoriesService } from './stories.service'
import { StoriesResolver } from './stories.resolver'

@Module({
  providers: [StoriesResolver, StoriesService],
  exports: [StoriesService],
})
export class StoriesModule {}
