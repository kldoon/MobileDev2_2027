import { StyleSheet, View } from 'react-native';
import RequestForm from './components/requestForm/requestForm.jsx';

export default function App() {
  return (
    <View style={styles.container}>
      <RequestForm />
    </View>
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
