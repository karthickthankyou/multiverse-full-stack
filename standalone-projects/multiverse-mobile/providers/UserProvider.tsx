// UserContext.js

import React, { createContext, useState, useEffect, ReactNode } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from '../config/firebase'

export const UserContext = createContext<User | null>(null)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user)
    })

    return () => unsubscribe()
  }, [])

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}
