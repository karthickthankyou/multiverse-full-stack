import { Injectable } from '@nestjs/common'
import { FindManyStoryArgs, FindUniqueStoryArgs } from './dto/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { CreateStoryInput } from './dto/create-story.input'
import { UpdateStoryInput } from './dto/update-story.input'

@Injectable()
export class StoriesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createStoryInput: CreateStoryInput) {
    return this.prisma.story.create({
      data: createStoryInput,
    })
  }

  findAll(args: FindManyStoryArgs) {
    return this.prisma.story.findMany(args)
  }

  findOne(args: FindUniqueStoryArgs) {
    return this.prisma.story.findUnique(args)
  }

  update(updateStoryInput: UpdateStoryInput) {
    const { id, ...data } = updateStoryInput
    return this.prisma.story.update({
      where: { id },
      data: data,
    })
  }

  remove(args: FindUniqueStoryArgs) {
    return this.prisma.story.delete(args)
  }
}
