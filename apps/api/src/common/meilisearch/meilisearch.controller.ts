import {
  BadRequestException,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  Request,
  UnauthorizedException,
} from '@nestjs/common'
import { INDEX_NAME, MeilisearchService } from './meilisearch.service'
import { PrismaService } from '../prisma/prisma.service'

@Controller('search')
export class MeilisearchController {
  constructor(
    private readonly meili: MeilisearchService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  async search(
    @Query('query') query: string,
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ) {
    return await this.meili.search({
      query,
      offset: offset ? Number(offset) : undefined,
      limit: limit ? Number(limit) : undefined,
    })
  }

  @Post('delete-story')
  async deleteStory(
    @Query('storyId', new ParseIntPipe()) storyId: number,
    @Request() req,
  ) {
    if (req.headers['x-secret-access-key'] !== process.env.SECRET_ACCESS_KEY) {
      throw new UnauthorizedException()
    }

    if (!storyId) {
      throw new BadRequestException('StoryId is missing.')
    }
    await this.prisma.$transaction(async (prisma) => {
      await prisma.userStory.deleteMany({
        where: {
          storyId,
        },
      })
      // Delete choices associated with the nodes
      await prisma.choice.deleteMany({
        where: {
          parentNode: {
            storyId,
          },
        },
      })

      // Delete the nodes associated with the story
      await prisma.node.deleteMany({
        where: {
          storyId,
        },
      })

      // Delete the story itself
      await prisma.story.delete({
        where: {
          id: storyId,
        },
      })
    })
  }

  @Get('sentry-testing')
  async sentryTesting() {
    throw new BadRequestException('Sentry testing...')
  }

  @Get('is-healthy')
  async isHealthy(@Request() req) {
    if (req.headers['x-secret-access-key'] !== process.env.SECRET_ACCESS_KEY) {
      throw new UnauthorizedException()
    }

    return this.meili.client.isHealthy()
  }

  @Post('delete-all')
  async deleteAll(@Request() req) {
    if (req.headers['x-secret-access-key'] !== process.env.SECRET_ACCESS_KEY) {
      throw new UnauthorizedException()
    }
    const searchIndex = await this.meili.client.getIndex(INDEX_NAME)

    await searchIndex.deleteAllDocuments()
    return { message: 'All items deleted successfully' }
  }
}
