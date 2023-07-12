import { ReactElement, useEffect, useState } from 'react'
import { Footer } from '@multiverse-org/ui/src/components/organisms/Footer'
import { usePathname } from 'next/navigation'
import { Header } from '../../organisms/Header'
import { MenuItem, Role } from '@multiverse-org/types'
import { useUserStore } from '@multiverse-org/store/user'

interface ILayoutProps {
  children: ReactElement | ReactElement[]
  menuItems?: MenuItem[]
  sideMenuItems?: MenuItem[]
  type?: Role
}

const NoNavUrls = ['/register', '/login']

export const Layout = ({
  children,
  menuItems = [],
  sideMenuItems = [],
  type,
}: ILayoutProps) => {
  const url = usePathname()
  const [pathname, setPathname] = useState<string>('')
  const uid = useUserStore((state) => state.uid)

  useEffect(() => {
    setPathname(url)
  }, [setPathname])

  return NoNavUrls.includes(pathname) ? (
    <main>{children}</main>
  ) : (
    <>
      <Header
        uid={uid}
        type={type}
        menuItems={menuItems}
        sideMenuItems={sideMenuItems}
      />
      <main>{children}</main>
      <Footer />
    </>
  )
}
