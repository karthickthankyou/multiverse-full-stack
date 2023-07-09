import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { HomeScreen } from './screens/Home'
import { Screen2 } from './screens/Screen2'
import { Wishlist } from './screens/Wishlist'
import { SignInScreen } from './screens/SignIn'
import { UserProvider } from './providers/UserProvider'
import { ProfileScreen } from './screens/Profile'
import { CustomDrawerContent } from './components/DrawerContent'
import { ApolloProvider } from './config/apollo'
import { Cart } from './screens/Cart'
import { Purchased } from './screens/Purchased'

// Create the drawer navigator
const Drawer = createDrawerNavigator()

export default function App() {
  return (
    <UserProvider>
      <ApolloProvider>
        <NavigationContainer>
          <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            initialRouteName="Home"
          >
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Screen2" component={Screen2} />
            <Drawer.Screen name="SignIn" component={SignInScreen} />
            <Drawer.Screen name="Wishlist" component={Wishlist} />
            <Drawer.Screen name="Cart" component={Cart} />
            <Drawer.Screen name="Purchased" component={Purchased} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </UserProvider>
  )
}
