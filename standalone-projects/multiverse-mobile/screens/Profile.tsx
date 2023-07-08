import { Text } from 'react-native'
import { UserContext } from '../providers/UserProvider'
import { useContext } from 'react'

export const ProfileScreen = () => {
  const user = useContext(UserContext)

  return <Text>Hello there. Its Profile. {user?.uid}</Text>
}
