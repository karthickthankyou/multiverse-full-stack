import { useEffect, useState } from 'react'
import { OrbitControls } from '@react-three/drei'

export const CustomOrbitControls = () => {
  const [isCmdPressed, setIsCmdPressed] = useState(false)

  useEffect(() => {
    function handleKeyDown(event: any) {
      // Check if the key being pressed is the command key
      if (event.key === 'Meta' || event.key === 'Control') {
        setIsCmdPressed(true)
      }
    }

    function handleKeyUp(event: any) {
      // Check if the key being released is the command key
      if (event.key === 'Meta' || event.key === 'Control') {
        setIsCmdPressed(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return (
    <OrbitControls
      //   minPolarAngle={radians(60)}
      //   maxPolarAngle={radians(120)}
      //   minAzimuthAngle={radians(60)}
      //   maxAzimuthAngle={radians(120)}
      minDistance={40}
      maxDistance={80}
      enableZoom={isCmdPressed}
    />
  )
}
