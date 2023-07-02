import create from 'zustand'
import { persist } from 'zustand/middleware'
import { NotificationType } from '@multiverse-org/types'

type State = {
  notifications: NotificationType[]
  addNotification: (notification: NotificationType) => void
  removeNotification: (id: NotificationType['id']) => void
  resetNotification: () => void
}

export const useNotificationStore = create<State>((set) => ({
  notifications: [],

  addNotification: (notification) =>
    set((state) => ({
      ...state,
      notifications: [...state.notifications, notification],
    })),

  removeNotification: (id) =>
    set((state) => ({
      ...state,
      notifications: state.notifications.filter((item) => item.id !== id),
    })),

  resetNotification: () => set({ notifications: [] }),
}))
