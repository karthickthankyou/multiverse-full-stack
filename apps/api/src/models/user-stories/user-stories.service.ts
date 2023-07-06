import { BadRequestException, Injectable } from '@nestjs/common'
import { FindManyUserStoryArgs, FindUniqueUserStoryArgs } from './dto/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { CreateUserStoryInput } from './dto/create-user-story.input'
import { UpdateUserStoryInput } from './dto/update-user-story.input'
import { UserStoryType } from '@prisma/client'

@Injectable()
export class UserStoriesService {
  constructor(private readonly prisma: PrismaService) {}
  create({ storyId, type, uid }: CreateUserStoryInput) {
    if (type === 'PURCHASED') {
      throw new BadRequestException(
        'You can not create a purchased item. Come on!',
      )
    }
    return this.prisma.userStory.upsert({
      create: {
        storyId,
        uid,
        type,
      },
      update: {
        type,
      },
      where: {
        uid_storyId: {
          storyId,
          uid,
        },
      },
    })
  }

  findAll(args: FindManyUserStoryArgs) {
    return this.prisma.userStory.findMany(args)
  }

  findOne(args: FindUniqueUserStoryArgs) {
    return this.prisma.userStory.findUnique(args)
  }

  update(updateUserStoryInput: UpdateUserStoryInput) {
    const { uid_storyId, type, ...data } = updateUserStoryInput
    return this.prisma.userStory.update({
      where: { uid_storyId },
      data: { ...data, type: type as unknown as UserStoryType },
    })
  }

  remove(args: FindUniqueUserStoryArgs) {
    return this.prisma.userStory.delete(args)
  }
}
