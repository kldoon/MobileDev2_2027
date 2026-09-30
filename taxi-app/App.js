import { StyleSheet, View, TextInput, Text, Button } from 'react-native';
import { useState } from 'react';

export default function App() {
  // const [name, setName] = useState();
  // const [location, setLocation] = useState();
  // const [destination, setDestination] = useState();
  const [form, setForm] = useState({});

  const handleFormChange = (field, v) => {
    setForm({ ...form, [field]: v });
  };

  const submit = () => {

    console.log(form)
  };

  // const handleNameChange = (v) => {
  //   setName(v);
  // };

  // const handleLocationChange = (v) => {
  //   setLocation(v);
  // };

  // const handleDestinationChange = (v) => {
  //   setDestination(v);
  // };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        keyboardType="default"
        onChangeText={(v) => handleFormChange('name', v)}
      />
      <TextInput
        style={styles.input}
        placeholder="Your Location"
        keyboardType="default"
        onChangeText={(v) => handleFormChange('location', v)}
      />
      <TextInput
        style={styles.input}
        placeholder="Your Destination"
        keyboardType="default"
        onChangeText={(v) => handleFormChange('destination', v)}
      />
      <TextInput
        style={styles.input}
        placeholder="Number of Passengers"
        keyboardType="numeric"
        onChangeText={(v) => handleFormChange('passengers', v)}
      />
      <Button title="Submit" onPress={submit} />

      <View style={{ marginTop: 20 }}>
        <Text>Data Summary:</Text>
        <Text>Name: {form.name}</Text>
        <Text>Your Location: {form.location}</Text>
        <Text>Your Destination: {form.destination}</Text>
      </View>
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
  input: {
    borderWidth: 1,
    borderColor: '#aaaaaa',
    padding: 6,
    borderRadius: 5,
    marginBottom: 10,
  },
});
