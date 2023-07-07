import { ReactNode } from 'react'
import { BrandIcon } from '../../atoms/BrandIcon'
import { LifeScene } from '@multiverse-org/3d/src/scenes/LifeScene'

import Link from 'next/link'
import { IconArrowBack } from '@tabler/icons-react'
import { Container } from '../../atoms/Container'

export interface IAuthLayoutProps {
  children: ReactNode
  title: string
  reverse?: boolean
}

export const AuthLayout = ({
  title,
  children,
  reverse = false,
}: IAuthLayoutProps) => {
  return (
    <Container className="relative flex flex-col md:flex-row gap-6 items-center justify-center h-[calc(100vh-4rem)] ">
      <div className="hidden w-1/2 md:block">
        <LifeScene />
      </div>

      <div className={`flex  w-1/2 ${reverse ? '-order-1' : ''}`}>
        <div className="w-full max-w-lg bg-white">
          <h1 className="flex items-end gap-2 mb-2 text-2xl">
            <BrandIcon /> <div>{title}</div>
          </h1>
          {children}
          <div className="mt-4 text-sm text-gray-300">
            <Link href="/" className="flex items-center gap-2 ">
              <IconArrowBack className="w-4 h-4" /> Back to home
            </Link>
          </div>
        </div>
      </div>
    </Container>
  )
}
