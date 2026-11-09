import { View, Text, StyleSheet, ScrollView } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';

const RequestsListScreen = () => {
  const [requestsList, setRequestsList] = useState([]);

  useEffect(() => {
    const db = SQLite.openDatabaseSync('taxi-app');
    const results = db.getAllSync('SELECT * FROM requests');
    setRequestsList(results);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Requests List</Text>

      <ScrollView contentContainerStyle={styles.list}>
        {requestsList.map((r) => (
          <View key={r.id} style={styles.card}>
            <Text style={styles.name}>{r.name}</Text>

            <View style={styles.row}>
              <Text style={styles.label}>Location:</Text>
              <Text style={styles.value}>{r.loc}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Destination:</Text>
              <Text style={styles.value}>{r.dest}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Date:</Text>
              <Text style={styles.value}>
                {new Date(r.date * 1000).toLocaleString()}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Gender:</Text>
              <Text style={styles.value}>{r.gender}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Luggage:</Text>
              <Text style={styles.value}>{r.luggage ? 'Yes' : 'No'}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d3436',
    textAlign: 'center',
    marginBottom: 16,
  },
  list: {
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Android shadow
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0984e3',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  label: {
    width: 100,
    fontWeight: '600',
    color: '#636e72',
  },
  value: {
    flex: 1,
    color: '#2d3436',
  },
});

export default RequestsListScreen;