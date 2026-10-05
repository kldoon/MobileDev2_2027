import { StyleSheet, View, TextInput, Text, Button } from 'react-native';
import { useState } from 'react';

const RequestForm =()=>{
  const [form, setForm] = useState({
    name: '',
    location: '',
    destination: '',
    passengers: 0,
  });

  const [errors, setErrors] = useState([]);

  const handleFormChange = (field, v) => {
    setForm({ ...form, [field]: v });
  };

  const submit = () => {
    // let tmpErrors = [];
    setErrors([]);
    if (form.name.trim().length === 0) {
      // tmpErrors = [...tmpErrors, 'The name is required!'];
      setErrors((oldErrors) => [...oldErrors, 'The name is required!']);
    }

    if (form.name.trim().length < 2) {
      // tmpErrors = [...tmpErrors, 'The name must be > 2 letters'];
      setErrors((oldErrors) => [...oldErrors, 'The name must be > 2 letters']);
    }

    if (form.destination.trim().length === 0) {
      // tmpErrors = [...tmpErrors, 'The destination is required!'];
      setErrors((oldErrors) => [...oldErrors, 'The destination is required!']);
    }

    if (form.destination.trim().length < 3) {
      // tmpErrors = [...tmpErrors, 'The destination must be > 3 letters'];
      setErrors((oldErrors) => [
        ...oldErrors,
        'The destination must be > 3 letters',
      ]);
    }

    if (form.passengers < 1 || form.passengers > 7) {
      // tmpErrors = [
      //   ...tmpErrors,
      //   'The number of passengers must be more than 0 up to 7',
      // ];

      setErrors((oldErrors) => [
        ...oldErrors,
        'The number of passengers must be more than 0 up to 7',
      ]);
    }

    // setErrors(tmpErrors);
  
    // A fine solution for the last state set bug
    // setErrors((oldErrors) => {
    //   if (oldErrors.length === 0) {
    //     console.log(form);
    //     // Take action
    //   }
    //   return oldErrors;
    // });

    if (errors.length === 0) {
      console.log(form);
      // Take action
    }
  };
  
  return(
    <View>
      <Text style={{fontSize: 25, color:'#f5d142', fontWeight:'bold', marginBottom:10, textAlign:'center'}}>Request a Taxi</Text>
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
          onChangeText={(v) => handleFormChange('passengers', parseInt(v))}
        />
        <Button title="Submit" onPress={submit} />
        <View>
          {errors.map((err) => (
            <Text style={styles.errors}>- {err}</Text>
          ))}
        </View>

        <View style={{ marginTop: 20 }}>
          <Text>Data Summary:</Text>
          <Text>Name: {form.name}</Text>
          <Text>Your Location: {form.location}</Text>
          <Text>Your Destination: {form.destination}</Text>
          <Text>Number of Passengers: {form.passengers}</Text>
        </View>
      </View>
  );
};

export default RequestForm;

const styles = StyleSheet.create({  
  input: {
    borderWidth: 1,
    borderColor: '#aaaaaa',
    padding: 6,
    borderRadius: 5,
    marginBottom: 10,
  },
  errors: {
    fontSize: 10,
    color: '#fa1111',
  },
});