import React, { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Trail } from '@react-three/drei'
import * as THREE from 'three'
import { angles, getUniqueRandom, interval } from './Dot'

export type DummyDotType = {
  id: number
  onTargetReached: (id: number) => void
  initialPosition: THREE.Vector3
}

const deathChance = 0.1 // 10% chance to stop every turn

export const DummyDot = React.memo(
  ({ id, onTargetReached, initialPosition }: DummyDotType) => {
    // Set initial position and target

    const [startPosition, setStartPosition] = useState(() => initialPosition)
    const [rand, setRand] = useState(() => getUniqueRandom(-99))
    const [endPosition, setEndPosition] = useState(() =>
      initialPosition.clone().add(angles[rand]),
    )
    const [lerpValue, setLerpValue] = useState(0)
    const [stopped, setStopped] = useState(false)

    // Change target every interval seconds.
    useEffect(() => {
      const intervalId = setInterval(() => {
        // Stop and then die.
        if (Math.random() <= deathChance) {
          if (stopped) {
            onTargetReached(id)
          } else {
            setStopped(true)
            return
          }
        }

        setStartPosition(() => endPosition.clone())
        const newRand = getUniqueRandom(rand)
        setRand(newRand)

        setEndPosition((state) => state.clone().add(angles[newRand]))
        setLerpValue(0) // Reset lerp value when target changes
      }, interval * 1000)

      // Clean up interval on unmount
      return () => {
        clearInterval(intervalId)
      }
    }, [endPosition])

    const [lerpPosition, setLerpPosition] = useState<THREE.Vector3 | null>(null)

    useFrame(({}, delta) => {
      if (stopped) {
        return
      }
      setLerpValue((prev) => Math.min(prev + delta / interval, 1)) // Ensure that lerpValue does not exceed 1
      let newPos = startPosition.clone()
      setLerpPosition(() => newPos.lerp(endPosition, lerpValue))
    })

    // Render the component

    return lerpPosition ? (
      <Trail
        attenuation={(w) => w / 4}
        interval={10}
        width={5}
        length={20}
        decay={5}
        color={'#808080'}
      >
        <Sphere args={[0.2, 8, 4]} position={lerpPosition}>
          <meshBasicMaterial color={'#808080'} />
        </Sphere>
      </Trail>
    ) : null
  },
)
