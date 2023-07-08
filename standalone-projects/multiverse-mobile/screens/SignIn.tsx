import React, { useContext, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { firebaseAuth } from '../config/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { UserContext } from '../providers/UserProvider'

import { useNavigation } from '@react-navigation/native'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { RootDrawerParamList } from '../config/navigation'
import { SignOutButton } from '../components/SignOutButton'

export const SignInScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const user = useContext(UserContext)

  const navigation =
    useNavigation<DrawerNavigationProp<RootDrawerParamList, 'Home'>>()

  const handleSignIn = () => {
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user
        console.log(user)
        navigation.navigate('Home')
      })
      .catch((error) => {
        var errorCode = error.code
        var errorMessage = error.message
        console.log(errorMessage)
      })
  }

  if (user?.uid) {
    return (
      <View style={styles.container}>
        <Text>You are already logged in.</Text>
        <SignOutButton />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="user@email.com"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="******"
        style={styles.input}
      />
      <Button title="Sign in" onPress={handleSignIn} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
})
