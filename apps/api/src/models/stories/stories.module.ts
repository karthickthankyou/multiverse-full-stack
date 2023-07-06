import { Module } from '@nestjs/common'
import { StoriesService } from './stories.service'
import { StoriesResolver } from './stories.resolver'
import { UsersService } from '../users/users.service'

@Module({
  providers: [StoriesResolver, StoriesService, UsersService],
  exports: [StoriesService],
})
export class StoriesModule {}
