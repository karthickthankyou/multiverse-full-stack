import create from 'zustand'
import { persist, devtools } from 'zustand/middleware'

type Role = 'admin' | 'cook'

type UserSliceType = {
  uid?: string
  displayName?: string
  email?: string
  roles?: Role[]
  token?: string
  loaded: boolean
  setUser: (payload: Partial<UserSliceType>) => void
  resetUser: () => void
}

const initialState: Pick<
  UserSliceType,
  'displayName' | 'email' | 'loaded' | 'roles' | 'token' | 'uid'
> = {
  uid: undefined,
  displayName: undefined,
  email: undefined,
  roles: undefined,
  token: undefined,
  loaded: false,
}

export const useUserStore = create<UserSliceType>((set) => ({
  ...initialState,
  setUser: (payload: Partial<UserSliceType>) =>
    set((state) => ({ ...state, ...payload, loaded: true })),
  resetUser: () => set(initialState),
}))
