import { useNavigation } from '@react-navigation/native';
import { View, Text, Button } from 'react-native';

const MyAccountScreen = () => {
  const nav = useNavigation();

  return (
    <View>
      <Text>My Account Screen</Text>
      <Text>Account Info</Text>
      <Text>Account Info</Text>
      <Text>Account Info</Text>
      <Text>Account Info</Text>
      <Text>Account Info</Text>
      <Text>Account Info</Text>
      <Button
        title="Go to Home"
        onPress={() => {
          // nav.navigate('driving');
          // For nested navigation we use the following
          nav.navigate('Home', { screen: 'driving', params: { example: 123 } });
        }}
      />
    </View>
  )
}

export default MyAccountScreen;