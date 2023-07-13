import { Controller, Post, Body, Get, Query, Res } from '@nestjs/common'
import { CreateStripeDto } from './dto/create-stripe-session.dto'
import StripeService from './stripe.service'
import { UserStoryType } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { StripeItemType } from '@multiverse-org/types'
import { Response } from 'express'

@Controller('stripe')
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly prisma: PrismaService,
  ) {}

  @Post()
  create(@Body() createStripeDto: CreateStripeDto) {
    return this.stripeService.createStripeSession(createStripeDto)
  }

  @Get('success')
  async handleStripeSuccess(
    @Query('session_id') sessionId: string,
    @Res() res: Response,
  ) {
    const session = await this.stripeService.stripe.checkout.sessions.retrieve(
      sessionId,
    )
    const { uid, items } = session.metadata
    const stories: StripeItemType[] = JSON.parse(items)
    const dataPromises = stories.map(({ id }) => {
      return this.prisma.userStory.upsert({
        create: { type: UserStoryType.PURCHASED, uid, storyId: id },
        update: { type: UserStoryType.PURCHASED },
        where: {
          uid_storyId: {
            storyId: id,
            uid,
          },
        },
      })
    })
    await Promise.all(dataPromises)

    res.redirect('http://localhost:3001/purchased')
  }
}
