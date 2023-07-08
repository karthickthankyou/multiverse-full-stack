import React from 'react'
import { Button } from 'react-native'
import { signOut } from 'firebase/auth'
import { firebaseAuth } from '../config/firebase'

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

  return <Button title="Sign Out" onPress={handleSignOut} />
}
