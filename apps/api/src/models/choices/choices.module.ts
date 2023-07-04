import { Module } from '@nestjs/common'
import { ChoicesService } from './choices.service'
import { ChoicesResolver } from './choices.resolver'

@Module({
  providers: [ChoicesResolver, ChoicesService],
  exports: [ChoicesService],
})
export class ChoicesModule {}
