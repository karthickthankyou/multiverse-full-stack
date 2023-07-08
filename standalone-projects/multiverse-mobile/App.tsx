import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { HomeScreen } from './screens/Home'
import { Screen2 } from './screens/Screen2'
import { Screen3 } from './screens/Screen3'
import { SignInScreen } from './screens/SignIn'
import { UserProvider } from './providers/UserProvider'
import { ProfileScreen } from './screens/Profile'
import { CustomDrawerContent } from './components/DrawerContent'

// Create the drawer navigator
const Drawer = createDrawerNavigator()

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          initialRouteName="Home"
        >
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Screen2" component={Screen2} />
          <Drawer.Screen name="SignIn" component={SignInScreen} />
          <Drawer.Screen name="Screen3" component={Screen3} />
          <Drawer.Screen name="Profile" component={ProfileScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </UserProvider>
  )
}
