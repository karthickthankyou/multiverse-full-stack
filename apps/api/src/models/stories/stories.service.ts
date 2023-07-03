import { Injectable } from '@nestjs/common'
import { FindManyStoryArgs, FindUniqueStoryArgs } from './dto/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { CreateStoryInput } from './dto/create-story.input'
import { UpdateStoryInput } from './dto/update-story.input'
import { MeilisearchService } from 'src/common/meilisearch/meilisearch.service'

@Injectable()
export class StoriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly meili: MeilisearchService,
  ) {}

  create({ nodes, ...createStoryInput }: CreateStoryInput) {
    return this.prisma.story.create({
      data: { ...createStoryInput, nodes: { createMany: { data: nodes } } },
    })
  }

  async findAll(
    { cursor, distinct, orderBy, skip, take, where }: FindManyStoryArgs,
    searchTerm?: string,
  ) {
    if (searchTerm && searchTerm.trim() !== '') {
      const searchResults = await this.meili.search({
        query: searchTerm,
        limit: 10,
      })
      const ids = searchResults.hits.map((hit) => hit.id)

      return this.prisma.story.findMany({
        orderBy,
        where: { ...where, id: { in: ids } },
      })
    } else {
      return this.prisma.story.findMany({
        cursor,
        distinct,
        orderBy,
        skip,
        take,
        where,
      })
    }
  }

  findOne(args: FindUniqueStoryArgs) {
    return this.prisma.story.findUnique(args)
  }

  update(updateStoryInput: UpdateStoryInput) {
    const { id, nodes, ...data } = updateStoryInput
    return this.prisma.story.update({
      where: { id },
      data: data,
    })
  }

  remove(args: FindUniqueStoryArgs) {
    return this.prisma.story.delete(args)
  }
}
