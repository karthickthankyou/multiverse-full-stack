import React from 'react'

interface BadgeProps {
  count: React.ReactNode
  children: React.ReactNode
}

export const BadgeNumber: React.FC<BadgeProps> = ({ count, children }) => {
  return (
    <div className="relative">
      {children}
      <div className="absolute px-2 py-1 text-xs font-bold -translate-x-1/2 translate-y-1/2 rounded-full bottom-full left-full">
        {count}
      </div>
    </div>
  )
}
