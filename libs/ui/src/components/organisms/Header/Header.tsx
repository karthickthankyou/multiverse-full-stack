import Link from 'next/link'
import { Brand } from '../../atoms/Brand'
import { Button } from '../../atoms/Button'
import { Container } from '../../atoms/Container'

import { NavSidebar, ShowMenuItems } from '../NavSidebar/NavSidebar'
import { ReactNode, Suspense } from 'react'

import { MenuItem, Role } from '@multiverse-org/types'
import { HeaderInfo } from '../HeaderInfo'
import { useAppSelector } from '@multiverse-org/store'
import { selectUid } from '@multiverse-org/store/user'

export type IHeaderProps = {
  menuItems?: MenuItem[]
  sideMenuItems?: MenuItem[]
  type?: Role
  HeaderIcons?: ReactNode
}

export const Header = ({
  menuItems = [],
  sideMenuItems = [],
  type,
  HeaderIcons,
}: IHeaderProps) => {
  const uid = useAppSelector(selectUid)
  console.log('uid', uid)
  return (
    <header className="relative z-40">
      <nav className="fixed top-0 w-full shadow-md shadow-gray-300/10 bg-white/50 backdrop-blur-md">
        <Container className="relative z-50 flex items-center justify-between h-16 py-2">
          <div className="relative z-10 flex items-center justify-between w-full gap-16">
            <Link href="/" aria-label="Home" className="w-auto">
              <Brand type={type} className="hidden h-10 sm:block" />
              <Brand type={type} shortForm className="block sm:hidden" />
            </Link>

            <Suspense fallback={null}>
              <ShowMenuItems menuItems={menuItems} />
            </Suspense>

            <div className="flex items-center gap-2">
              {!uid ? (
                <>
                  <Link href="/register">
                    <Button variant="outlined" className="hidden md:block">
                      Create account
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button>Log in</Button>
                  </Link>
                </>
              ) : (
                HeaderIcons
              )}

              <NavSidebar menuItems={sideMenuItems} />
            </div>
          </div>
        </Container>
      </nav>
      <div className="h-16" />
    </header>
  )
}
