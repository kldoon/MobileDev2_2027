import { StyleSheet, View, ScrollView, TextInput, Text, Button, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import RadioGroup from '../common/RadioGroup.jsx'

import rideRequestSchema from '../../utils/schemas/rideRequest';
import { doc, getDoc } from "firebase/firestore";
import { fireStoreDB } from '../../utils/firebase.js';
// import { getRequestById } from '../../utils/db'; // SQLite

const INIT_FORM = {
  id: null,
  name: '',
  location: '',
  destination: '',
  passengers: 0,
  date: new Date(),
  lugge: '',
  gender: 'Male'
};

const RequestForm = (props) => {
  const [form, setForm] = useState(INIT_FORM);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [errors, setErrors] = useState([]);

  const handleFormChange = (field, v) => {
    setForm({ ...form, [field]: v });
  };

  // Firestore ids are strings, null when the field is empty
  const handleIdChange = (v) => {
    // const digits = v.replace(/[^0-9]/g, '');
    // handleFormChange('id', digits === '' ? null : parseInt(digits));
    handleFormChange('id', v.trim() === '' ? null : v.trim());
  };

  const submit = () => {
    setErrors([]);
    rideRequestSchema.validate(form, { abortEarly: false }).then(data => {
      props.onSubmit(data);
      setForm(INIT_FORM);
    }).catch(error => {
      console.log(error);
      setErrors(error.errors)
    })
  };

  const handleEdit = () => {
    if (form.id === null) {
      Alert.alert("Please enter a request ID first");
      return;
    }

    // Firestore Code
    getDoc(doc(fireStoreDB, 'requests', form.id))
      .then(snapshot => {
        if (!snapshot.exists()) {
          Alert.alert("Item Not found!");
        } else {
          const data = snapshot.data();
          setForm({
            ...data,
            id: snapshot.id,
            // Firestore returns a Timestamp, the form needs a JS Date
            date: data.date.toDate(),
          });
        }
      })
      .catch(() => Alert.alert("Failed to load the request"));

    /*
    ///////// SQLite Code
    const data = getRequestById(form.id);

    if (!data) {
      Alert.alert("Item Not found!");
    } else {
      setForm({
        id: data.id,
        name: data.name,
        location: data.loc,
        destination: data.dest,
        passengers: data.pass,
        // the date is saved in seconds, JS needs milliseconds
        date: new Date(data.date * 1000),
        lugge: data.luggage === 1 ? 'Has luggage' : 'No luggage',
        gender: data.gender
      });
    }
    */
  }

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
      <View style={styles.editRow}>
        <TextInput
          style={[styles.input, styles.editInput]}
          placeholder="Request ID (for editing)"
          keyboardType="number-pad"
          value={form.id === null ? '' : String(form.id)}
          onChangeText={handleIdChange}
        />
        <TouchableOpacity
          style={styles.editButton}
          onPress={handleEdit}
          accessibilityRole="button"
          accessibilityLabel="Load request for editing"
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        accessible={true}   // this is true by default
        accessibilityLabel="Enter your name here"
        style={styles.input}
        placeholder="Your Name"
        keyboardType="default"
        value={form.name}
        onChangeText={(v) => handleFormChange('name', v)}
      />
      <TextInput
        style={styles.input}
        placeholder="Your Location"
        keyboardType="default"
        value={form.location}
        onChangeText={(v) => handleFormChange('location', v)}
      />
      <TextInput
        style={styles.input}
        placeholder="Your Destination"
        keyboardType="default"
        value={form.destination}
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
        value={form.passengers.toString()}
        onChangeText={(v) => handleFormChange('passengers', parseInt(v) || 0)}
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
          value={form.date}
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
        value={form.lugge}
        onOptionSelected={(v) => handleFormChange('lugge', v)}
      />
      <RadioGroup
        options={['Male', 'Female']}
        value={form.gender}
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
  editRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginBottom: 10,
  },
  editInput: {
    flex: 1,          // the input takes the free space
    marginBottom: 0,  // the row already has the bottom margin
    marginRight: 8,
  },
  editButton: {
    backgroundColor: '#f5d142',
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButtonText: {
    color: '#222222',
    fontWeight: 'bold',
    fontSize: 15,
  },
  errors: {
    fontSize: 10,
    color: '#fa1111',
  },
});