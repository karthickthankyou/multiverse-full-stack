import { StripeItemType } from '../../types'

export class CreateStripeDto {
  uid: string
  items: StripeItemType[]
  redirectUrl: string
}
