import { ReactElement, useEffect, useState } from 'react'
import { Footer } from '@multiverse-org/ui/src/components/organisms/Footer'
import { usePathname } from 'next/navigation'
import { Header } from '../../organisms/Header'
import { MenuItem, Role } from '@multiverse-org/types'
import { selectUser } from '@multiverse-org/store/user'
import { useAppSelector } from '@multiverse-org/store'

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
  const uid = useAppSelector(selectUser)

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
