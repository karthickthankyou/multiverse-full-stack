import { IconGitBranch } from '@tabler/icons-react'
import { ReactNode } from 'react'

export interface IBrandIconProps {
  children?: ReactNode
}

export const BrandIcon = ({
  children = <IconGitBranch />,
}: IBrandIconProps) => {
  return <div className="inline-block overflow-hidden">{children}</div>
}
