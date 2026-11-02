import { StyleSheet, View, Linking, Button, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import AboutScreen from './screens/about.screen.jsx';
import MyAccountScreen from './screens/my-account.screen.jsx';
import HomeScreen from './screens/home.screen.jsx';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ margin: 10, width: 50, height: 50, borderRadius: 50, backgroundColor: '#ff9099', justifyContent: 'center', alignItems: 'center' }}>
        <Text>AS</Text>
      </View>
      <Text style={{ marginBottom: 40 }}>Thanks for using Taxi App</Text>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Help"
        onPress={() => Linking.openURL('https://mywebsite.com/help')}
      />
      <View style={{ marginTop: '100%' }}>
        <Button title='Logout' />
      </View>
    </DrawerContentScrollView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="MyAccount" component={MyAccountScreen} />
          <Drawer.Screen name="About" component={AboutScreen} />
        </Drawer.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
