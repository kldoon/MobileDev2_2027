import { useNavigation } from '@react-navigation/native';
import RequestForm from '../components/requestForm/requestForm.jsx';
import { Alert } from 'react-native';
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";

import { insertRequest, updateRequest } from '../utils/db';
import { fireStoreDB } from '../utils/firebase.js';

const RequestScreen = () => {
  // const nav = useNavigation();

  const handleSubmit = (data) => {
    // nav.navigate('driving', { data })

    // true when id is null OR undefined
    const isNew = data.id == null;

    // Firestore Code
    // The id is the document id, it is not stored inside the document.
    const { id, ...fields } = data;
    const action = isNew ? 'added' : 'updated';

    // Add a new document with a generated id, or update the existing one.
    const request = isNew
      ? addDoc(collection(fireStoreDB, "requests"), fields)
      : updateDoc(doc(fireStoreDB, "requests", id), fields);

    request
      .then(() => {
        Alert.alert('Success', `Your request has been ${action} successfully`, [
          { text: 'OK' },
        ]);
      })
      .catch(error => {
        Alert.alert('Error', `Failed to ${action} your request`, [
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