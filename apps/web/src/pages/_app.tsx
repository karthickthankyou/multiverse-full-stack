import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@multiverse-org/network/src/config/apollo'
import { AppLevelListeners } from '@multiverse-org/ui/src/components/atoms/AppLevelListeners'
import { Notifications } from '@multiverse-org/ui/src/components/organisms/Notifications'
import { Header } from '@multiverse-org/ui/src/components/organisms/Header'
import { MenuItem } from '@multiverse-org/types'

const MENUITEMS: MenuItem[] = [
  { label: 'My Stories', href: '/my-stories', loggedIn: true },
  { label: 'Create Story', href: '/create-story', loggedIn: true },
  { label: 'Settings', href: '/settings', loggedIn: true },
]
const SUBMENUITEMS: MenuItem[] = [
  ...MENUITEMS,
  { label: 'Settings', href: '/settings', loggedIn: false },
]

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider>
      <AppLevelListeners />
      <Header type="" menuItems={MENUITEMS} sideMenuItems={SUBMENUITEMS} />
      <Component {...pageProps} />
      <Notifications />
    </ApolloProvider>
  )
}
