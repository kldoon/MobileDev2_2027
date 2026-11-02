import { StyleSheet, View, ScrollView, TextInput, Text, Button, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import RadioGroup from '../common/RadioGroup.jsx'

import rideRequestSchema from '../../utils/schemas/rideRequest';

const RequestForm = (props) => {
  const [form, setForm] = useState({
    name: '',
    location: '',
    destination: '',
    passengers: 0,
    date: new Date(),
    lugge: '',
    gender: ''
  });
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [errors, setErrors] = useState([]);

  const handleFormChange = (field, v) => {
    setForm({ ...form, [field]: v });
  };

  const submit = () => {
    setErrors([]);
    rideRequestSchema.validate(form, { abortEarly: false }).then(data => {
      console.log(data);
      props.onSubmit(data);
    }).catch(error => {
      setErrors(error.errors)
    })
  };

  return (
    <ScrollView>
      <Text
        accessible={true}
        accessibilityLabel="Fill this form to request a taxi"
        accessibilityRole="header"
        style={{
          fontSize: 25,
          color: '#f5d142',
          fontWeight: 'bold',
          marginBottom: 10,
          textAlign: 'center'
        }}>
        Request a Taxi
      </Text>
      <TextInput
        accessible={true}   // this is true by default
        accessibilityLabel="Enter your name here"
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
        accessibilityLabel="Number of Passengers"
        accessibilityHint="It should be more than 0 and less than 7 passengers"
        disabled={!form.destination.length}
        accessibilityState={{ disabled: !form.destination.length }}
        placeholder="Number of Passengers"
        keyboardType="numeric"
        onChangeText={(v) => handleFormChange('passengers', parseInt(v))}
      />

      <TouchableOpacity
        style={{ width: 100, height: 24, backgroundColor: "#A80000" }}
        onPress={() => {
          setShowTimePicker(true)
        }}
      >
        <Text style={{ color: "#ECF6FD" }}>
          Pick a date/time
        </Text>
      </TouchableOpacity>

      {showTimePicker && (
        <RNDateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          minimumDate={new Date()}
          maximumDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
          onChange={(_, selected) => {
            setShowTimePicker(false);
            if (selected) handleFormChange('date', selected);
          }}
        />
      )}
      <RadioGroup
        options={['Has luggage', 'No luggage']}
        onOptionSelected={(v) => handleFormChange('lugge', v)}
      />
      <RadioGroup
        options={['Male', 'Female']}
        onOptionSelected={(v) => handleFormChange('gender', v)}
      />
      <Button
        title="Submit"
        onPress={submit}
      />
      <View>
        {errors.map((err, i) => (
          <Text key={i} style={styles.errors}>- {err}</Text>
        ))}
      </View>

      <View style={{ marginTop: 20 }}>
        <Text>Data Summary:</Text>
        <Text>Name: {form.name}</Text>
        <Text>Your Location: {form.location}</Text>
        <Text>Your Destination: {form.destination}</Text>
        <Text>Number of Passengers: {form.passengers}</Text>
        <Text>Date: {form.date.toDateString()}</Text>
        <Text>Lugge: {form.lugge}</Text>
        <Text>Gender: {form.gender}</Text>
      </View>
    </ScrollView>
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