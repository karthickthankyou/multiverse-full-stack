import { Injectable } from '@nestjs/common'
import Stripe from 'stripe'
import { CreateStripeDto } from './dto/create-stripe-session.dto'
import { toTitleCase } from 'src/common/util'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export default class StripeService {
  public stripe: Stripe

  constructor(private readonly prisma: PrismaService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15',
    })
  }

  async createStripeSession({ items, uid, redirectUrl }: CreateStripeDto) {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items
        .filter(({ price }) => price > 0)
        .map(({ title, price, image }) => ({
          quantity: 1,
          price_data: {
            product_data: {
              name: toTitleCase(title),
              images: [image],
            },
            currency: 'usd',
            unit_amount: price * 100,
          },
        })),
      mode: 'payment',
      success_url: `http://localhost:3000/stripe/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${redirectUrl}/cart`,
      metadata: {
        uid,
        items: JSON.stringify(items),
      },
    })

    return { sessionId: session.id }
  }
}
