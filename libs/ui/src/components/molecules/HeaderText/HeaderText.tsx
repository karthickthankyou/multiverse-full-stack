import { ReactNode } from 'react'

export interface IHeaderTextProps {
  children: ReactNode
}

export const HeaderText = ({ children }: IHeaderTextProps) => {
  return <div className="mb-2 text-lg font-semibold">{children}</div>
}
