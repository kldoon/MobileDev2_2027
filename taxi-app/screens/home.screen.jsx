import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import RequestScreen from './request.screen.jsx';
import DrivingScreen from './driving.screen.jsx';
import RequestsListScreen from './requests-list.screen.jsx';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={
        ({ route }) => ({
          tabBarActiveTintColor: 'red',
          tabBarInactiveTintColor: '#626262',
          animation: 'shift',
          headerShown: false
        })
      }
    >
      <Tab.Screen
        name="request"
        component={RequestScreen}
        options={{
          title: 'Request a Taxi',
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="taxi" size={size} color={color} />
        }}
      />
      <Tab.Screen
        name="driving"
        component={DrivingScreen}
        options={{
          title: 'Driving Map',
          headerShown: false,
          tabBarIcon: () => <MaterialCommunityIcons name="navigation-variant" size={30} color='#d465b5' />
        }}
      />
      <Tab.Screen
        name="about"
        component={RequestsListScreen}
        options={{ title: 'Requests List', tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="format-list-bulleted" size={size} color={color} /> }}
      />
    </Tab.Navigator>
  )
}

export default HomeScreen;