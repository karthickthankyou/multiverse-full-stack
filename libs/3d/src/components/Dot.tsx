import React, { useRef, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Sphere, Trail } from '@react-three/drei'
import * as THREE from 'three'
import { DummyDot, DummyDotType } from './DummyDot'

// Time to move between positions in seconds
export const interval = 2

export const distance = 6
// Define possible movement vectors
export const angles = [
  new THREE.Vector3(distance, 0, 0),
  new THREE.Vector3(0, distance, 0),
  new THREE.Vector3(0, 0, distance),
  new THREE.Vector3(-distance, 0, 0),
  new THREE.Vector3(0, -distance, 0),
  new THREE.Vector3(0, 0, -distance),
]

export const getUniqueRandom = (
  prevAngle: number,
  notIn?: number[],
): number => {
  let rand = -1
  do {
    rand = Math.floor(Math.random() * angles.length)
  } while (rand === (prevAngle + 3) % angles.length || notIn?.includes(rand))

  return rand
}

export type DotSpawnType = {
  id: number
  initialPosition: THREE.Vector3
}

export const Dot = React.forwardRef<THREE.Mesh<THREE.BufferGeometry>>(
  (props, ref) => {
    // Set initial position and target
    const [startPosition, setStartPosition] = useState(
      () => new THREE.Vector3(0, 0, 0),
    )
    const [rand, setRand] = useState(() => 0)
    const [endPosition, setEndPosition] = useState(() => angles[rand])
    const [lerpValue, setLerpValue] = useState(0)

    const { camera } = useThree() // Access Three.js camera

    // Change target every interval seconds.
    useEffect(() => {
      const intervalId = setInterval(() => {
        const newStartPosition = endPosition.clone()
        setStartPosition(() => newStartPosition.clone())

        const newRand = getUniqueRandom(rand)
        setRand(newRand)

        setEndPosition((state) => state.clone().add(angles[newRand]))
        setLerpValue(0) // Reset lerp value when target changes
        // const newDummyDots = new Array(1 + Math.floor(Math.random() * 2))
        // Create babies

        const newDummyDots = new Array(1 + Math.floor(Math.random() * 2))
          .fill(null)
          .map((_, index) => ({
            id: Date.now() + index,
            initialPosition: newStartPosition.clone(),
            initialDirection: getUniqueRandom(rand, [newRand]),
            //  (newRand + (index + 1)) % angles.length
            onTargetReached: (id: number) => {
              setDummyDots((prevDots) =>
                prevDots?.filter((dot) => dot.id !== id),
              )
            },
          }))
        setDummyDots((prevDots) => [...prevDots, ...newDummyDots])
      }, interval * 1000)

      // Clean up interval on unmount
      return () => {
        clearInterval(intervalId)
      }
    }, [endPosition])

    const [lerpPosition, setLerpPosition] = useState<THREE.Vector3 | null>(null)
    useFrame(({ clock }, delta) => {
      setLerpValue((prev) => Math.min(prev + delta / interval, 1)) // Ensure that lerpValue does not exceed 1
      let newPos = startPosition.clone()
      newPos.lerp(endPosition, lerpValue)

      camera.lookAt(newPos)

      //   camera.position.x = newPos.x + 10
      //   camera.position.y = newPos.y + 10
      //   camera.position.z = newPos.z + 10

      setLerpPosition(() => newPos.lerp(endPosition, lerpValue))
    })

    const [dummyDots, setDummyDots] = useState<DummyDotType[]>([])

    // Render the component
    return (
      <group>
        {dummyDots.map((dot, index) => (
          <DummyDot
            id={dot.id}
            key={dot.id}
            onTargetReached={dot.onTargetReached}
            initialPosition={dot.initialPosition}
            initialDirection={dot.initialDirection}
          />
        ))}
        {lerpPosition ? (
          <group renderOrder={1}>
            <Trail
              attenuation={(w) => w / 4}
              interval={4}
              width={10}
              length={100}
              decay={2}
              color={'#8000ff'}
            >
              <Sphere ref={ref} args={[0.3, 8, 4]} position={lerpPosition}>
                <meshBasicMaterial color={'#8000ff'} />
              </Sphere>
            </Trail>
          </group>
        ) : null}
      </group>
    )
  },
)
