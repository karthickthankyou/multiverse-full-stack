import { StripeItemType } from '@multiverse-org/types'

export class CreateStripeDto {
  uid: string
  items: StripeItemType[]
  redirectUrl: string
}
