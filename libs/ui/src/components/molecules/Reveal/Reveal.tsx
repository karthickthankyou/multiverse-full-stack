import React, { useState } from 'react'
export interface IRevealProps {
  secret: string | number
}

const Reveal = ({ secret }: IRevealProps) => {
  const [revealed, setRevealed] = useState(false)

  return (
    <button
      className="flex flex-col items-center gap-2 "
      onClick={() => setRevealed((state) => !state)}
    >
      <span
        className={`text-2xl tracking-wider  px-1 ${
          revealed ? 'bg-primary' : 'bg-checker text-transparent'
        }`}
      >
        {secret}
      </span>
      <span className="text-xs text-gray-600">
        {revealed ? 'Hide' : 'Tap to reveal'}
      </span>
    </button>
  )
}

export { Reveal }
