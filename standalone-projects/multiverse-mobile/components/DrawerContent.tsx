import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'

import { Button } from 'react-native'
import { useContext } from 'react'
import { UserContext } from '../providers/UserProvider'
import { SignOutButton } from './SignOutButton'

export const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (
  props,
) => {
  const user = useContext(UserContext)
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {user?.uid ? (
        <SignOutButton />
      ) : (
        <>
          <Button
            title="Login"
            onPress={() => props.navigation.navigate('SignIn')}
          />
          <Button
            title="Register"
            onPress={() => props.navigation.navigate('SignUp')}
          />
        </>
      )}
    </DrawerContentScrollView>
  )
}
