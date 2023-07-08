import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { HomeScreen } from './screens/Home'
import { Screen2 } from './screens/Screen2'
import { Screen3 } from './screens/Screen3'

// Create the drawer navigator
const Drawer = createDrawerNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Screen2" component={Screen2} />
        <Drawer.Screen name="Screen3" component={Screen3} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}
