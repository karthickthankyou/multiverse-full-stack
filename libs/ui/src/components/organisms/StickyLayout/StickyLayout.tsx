import React, { ReactNode } from 'react'
import { Container } from '../../atoms/Container'

export interface IStickyLayoutProps {
  sidebarContent: ReactNode
  children: ReactNode
}

export const StickyLayout = ({
  sidebarContent,
  children,
}: IStickyLayoutProps) => (
  <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)] gap-6  ">
    <div className="flex flex-col w-full h-full md:max-w-lg ">
      {sidebarContent}
    </div>
    <div className="flex flex-col w-full md:overflow-auto thin-scrolbar">
      {children}
    </div>
  </div>
)
