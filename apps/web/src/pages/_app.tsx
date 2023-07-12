import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@multiverse-org/network/src/config/apollo'
import { AppLevelListeners } from '@multiverse-org/ui/src/components/atoms/AppLevelListeners'
import { NotificationWrapper } from '@multiverse-org/ui/src/components/organisms/Notifications'
import { Header } from '@multiverse-org/ui/src/components/organisms/Header'
import { MenuItem } from '@multiverse-org/types'

const MENUITEMS: MenuItem[] = [
  { label: 'My Stories', href: '/my-stories', loggedIn: true },
  { label: 'Create Story', href: '/create-story', loggedIn: true },
]
const SUBMENUITEMS: MenuItem[] = [
  ...MENUITEMS,
  { label: 'Cart', href: '/cart', loggedIn: false },
  { label: 'Wishlist', href: '/wishlist', loggedIn: false },
  { label: 'Purchased', href: '/purchased', loggedIn: false },
  { label: 'Settings', href: '/settings', loggedIn: false },
]

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider>
      <AppLevelListeners />
      <Header type="" menuItems={MENUITEMS} sideMenuItems={SUBMENUITEMS} />
      <Component {...pageProps} />
      <NotificationWrapper />
    </ApolloProvider>
  )
}
