import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import React from 'react'
import { Dot } from '../components/Dot'
import { Vector3 } from 'three'

export const radians = (degrees: number) => degrees * (Math.PI / 180)

export const LifeScene = ({
  children,
  camera,
  className = '',
}: {
  camera?: React.ReactNode
  children?: React.ReactNode
  className?: string
}) => {
  return (
    <Canvas
      style={{
        zIndex: 0,
        height: `calc(100vh - 4rem)`,
        background:
          'linear-gradient(to top right, hsl(270, 0%, 70%), hsl(270, 20%, 90%))',
      }}
      className={className}
    >
      {children}
      {camera || (
        <PerspectiveCamera
          makeDefault
          fov={60}
          near={0.1}
          far={1000}
          position={[10, 10, 10]}
        />
      )}
      <OrbitControls />
      <group position={new Vector3(0.01, 0.01, 0.01)}>
        <Dot />
      </group>
    </Canvas>
  )
}
