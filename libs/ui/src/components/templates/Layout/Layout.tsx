import { ReactElement, useEffect, useState } from 'react'
import { Footer } from '@multiverse-org/ui/src/components/organisms/Footer'
import { usePathname } from 'next/navigation'
import { Header } from '../../organisms/Header'
import { MenuItem, Role } from '@multiverse-org/types'

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

  useEffect(() => {
    setPathname(url)
  }, [setPathname])

  return NoNavUrls.includes(pathname) ? (
    <main>{children}</main>
  ) : (
    <>
      <Header type={type} menuItems={menuItems} sideMenuItems={sideMenuItems} />
      <main>{children}</main>
      <Footer />
    </>
  )
}
