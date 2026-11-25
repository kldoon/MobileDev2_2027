import { useNavigation } from '@react-navigation/native';
import RequestForm from '../components/requestForm/requestForm.jsx';
import { Alert } from 'react-native';
import { collection, addDoc } from "firebase/firestore";

import { insertRequest, updateRequest } from '../utils/db';
import { fireStoreDB } from '../utils/firebase.js';

const RequestScreen = () => {
  // const nav = useNavigation();

  const handleSubmit = (data) => {
    // nav.navigate('driving', { data })

    // true when id is null OR undefined
    const isNew = data.id == null;

    // Firestore Code
    // Add a new document with a generated id.
    addDoc(collection(fireStoreDB, "requests"), data)
      .then((docRef) => {
        //console.log("Document written with ID: ", docRef.id);
        Alert.alert('Success', `Your request has been added successfully`, [
          { text: 'OK' },
        ]);
      })
      .error(error => {
        Alert.alert('Error', `Failed to add your request`, [
          { text: 'OK' },
        ]);
      });

    /*
    ///////// SQLite Code
    const result = isNew ? insertRequest(data) : updateRequest(data);

    const action = isNew ? 'submitted' : 'updated';
    if (result.changes > 0) {
      Alert.alert('Success', `Your request has been ${action} successfully`, [
        { text: 'OK' },
      ]);
    } else {
      Alert.alert('Error', `Failed to ${action} your request`, [
        { text: 'OK' },
      ]);
    }
    
    */

  }
  return <RequestForm onSubmit={handleSubmit} />;
}

export default RequestScreen;