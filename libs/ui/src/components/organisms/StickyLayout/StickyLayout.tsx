import React, { ReactNode } from 'react'
import { Container } from '../../atoms/Container'

export interface IStickyLayoutProps {
  sidebarContent: ReactNode
  children: ReactNode
  classes?: {
    sidebarWidth: string
  }
}

export const StickyLayout = ({
  sidebarContent,
  children,
  classes = {
    sidebarWidth: 'md:max-w-lg',
  },
}: IStickyLayoutProps) => (
  <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)] gap-6  ">
    <div className={`flex flex-col w-full h-full ${classes.sidebarWidth}`}>
      {sidebarContent}
    </div>
    <div className="flex flex-col w-full md:overflow-auto thin-scrolbar">
      {children}
    </div>
  </div>
)
