import { useRoute } from '@react-navigation/native';
import { View, Text } from 'react-native';

const DrivingScreen = () => {
  const route = useRoute();

  return (
    <View>
      <Text> Driving Screen</Text>
      <Text>Map</Text>
      <Text>
        {
          JSON.stringify(route.params.data)
        }
      </Text>
    </View>
  )
}

export default DrivingScreen;