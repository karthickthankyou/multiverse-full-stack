import { ReactNode } from 'react'
export type Role = 'admin' | 'manager' | 'valet'

export type GetUserType = {
  uid: string
  displayName: string
  email: string
  emailVerified: boolean
  phoneNumber: string
  roles: Role[]
}

export type MenuItem = { label: string; href: string; loggedIn: boolean }

export type NotificationType = {
  id: string
  message: ReactNode
  type?: 'success' | 'error' | 'info' | 'warning'
  position?:
    | 'top-right'
    | 'top-left'
    | 'top-center'
    | 'bottom-right'
    | 'bottom-left'
    | 'bottom-center'
}

export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType[number]
