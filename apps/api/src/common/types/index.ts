export type Role = 'admin' | 'manager' | 'valet'

export type GetUserType = {
  uid: string
  displayName: string
  email: string
  emailVerified: boolean
  phoneNumber: string
  roles: Role[]
}

export type TotalPrice = {
  parkingCharge: number
  valetChargeDropoff: number
  valetChargePickup: number
  servicesCharge: number
}

export type StripeItemType = {
  image: string
  id: number
  price: number
  title: string
}
