import React from 'react'

import { signOut } from 'firebase/auth'
import { firebaseAuth } from '../config/firebase'
import { Button } from '.'

export const SignOutButton = () => {
  const handleSignOut = () => {
    signOut(firebaseAuth)
      .then(() => {
        console.log('User signed out!')
      })
      .catch((error) => {
        console.error('Failed to sign out. ', error)
      })
  }

  return <Button title="Logout" onPress={handleSignOut} />
}
