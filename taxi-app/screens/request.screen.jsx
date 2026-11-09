import { useNavigation } from '@react-navigation/native';
import RequestForm from '../components/requestForm/requestForm.jsx';
import { useEffect } from 'react';
import * as SQLite from 'expo-sqlite';
import { Alert } from 'react-native';

const RequestScreen = () => {
  let db;
  // const nav = useNavigation();

  useEffect(() => {
    db = SQLite.openDatabaseSync('taxi-app');

    db.execSync(`
        CREATE TABLE IF NOT EXISTS requests (
          id INTEGER PRIMARY KEY NOT NULL, 
          name TEXT NOT NULL, 
          loc TEXT NOT NULL, 
          dest TEXT NOT NULL, 
          pass INTEGER,
          luggage INTEGER,
          gender TEXT,
          date INTEGER
        );
    `);
  }, []);

  const handleSubmit = (data) => {
    // nav.navigate('driving', { data })
    const result = db.runSync('INSERT INTO requests (name, loc, dest, pass, luggage, gender, date) VALUES (?,?,?,?,?,?,?)',
      data.name, data.location, data.destination, data.passengers, data.lugge == 'Has luggage' ? 1 : 0, data.gender, Math.floor(data.date / 1000.0)
    );

    if (result.changes > 0) {
      Alert.alert('Success', 'Your request has been submitted successfully', [
        { text: 'OK' },
      ]);
    } else {
      Alert.alert('Error', 'Failed to submit your request', [
        { text: 'OK' },
      ]);
    }
  }

  return <RequestForm onSubmit={handleSubmit} />;
}

export default RequestScreen;