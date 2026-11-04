import { useNavigation } from '@react-navigation/native';
import RequestForm from '../components/requestForm/requestForm.jsx';
import { useEffect } from 'react';
import * as SQLite from 'expo-sqlite';

const RequestScreen = () => {
  let db;
  const nav = useNavigation();
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
    console.log(JSON.stringify(data));
    const result = db.runSync('INSERT INTO requests (name, loc, dest, pass, luggage, gender, date) VALUES (?,?,?,?,?,?,?)',
      data.name, data.location, data.destination, data.passengers, Number(data.lugge), data.gender, Math.floor(data.date / 1000.0)
    );
    console.log(result);
  }

  return <RequestForm onSubmit={handleSubmit} />;
}

export default RequestScreen;