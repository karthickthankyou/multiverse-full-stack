import { useNotification } from '@multiverse-org/hooks/src/notifications'
import { useUserListener } from '@multiverse-org/hooks/src/user'

export interface IAppLevelListenersProps {}

export const AppLevelListeners = () => {
  useUserListener()
  useNotification()
  return null
}
