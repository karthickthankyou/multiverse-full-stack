import { Module } from '@nestjs/common'
import { UserStoriesService } from './user-stories.service'
import { UserStoriesResolver } from './user-stories.resolver'
import { UsersService } from '../users/users.service'

@Module({
  providers: [UserStoriesResolver, UserStoriesService, UsersService],
  exports: [UserStoriesService],
})
export class UserStoriesModule {}
