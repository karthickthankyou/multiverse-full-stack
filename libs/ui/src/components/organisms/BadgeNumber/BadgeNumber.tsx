import React from 'react'

interface BadgeProps {
  count?: number
  children: React.ReactNode
}

const returnDisplayNumber = (num?: number) => {
  if (!num) return
  return (num || 0) > 9 ? '9+' : num
}

export const BadgeNumber: React.FC<BadgeProps> = ({ count, children }) => {
  const displayCount = returnDisplayNumber(count)
  console.log('displayCount: ', displayCount)

  return (
    <div className="relative inline-block">
      {children}
      <div className="absolute px-2 py-1 text-xs font-bold -translate-x-1/2 translate-y-1/2 rounded-full bottom-full left-full">
        {displayCount}
      </div>
    </div>
  )
}
