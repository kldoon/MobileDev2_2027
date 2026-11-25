import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { query, getDocs, collection } from "firebase/firestore";

import { getAllRequests, deleteRequest as removeRequest } from '../utils/db';
import { fireStoreDB } from '../utils/firebase.js';

const RequestsListScreen = () => {
  const [requestsList, setRequestsList] = useState([]);

  const readRequests = () => {
    //Firebase code
    const q = query(collection(fireStoreDB, 'requests'))
    getDocs(q).then(snapshot => {
      if (snapshot.docs.length > 0) {
        snapshot.docs.map(doc => {
          setRequestsList(prev => ([...prev, { ...doc.data(), id: doc.id }]));
        })
      }
    })

    // SQLite Code
    // setRequestsList(getAllRequests());
  }

  const deleteRequest = (id) => {
    const res = removeRequest(id);
    if (res.changes > 0) {
      readRequests();
      Alert.alert("Delete Success");
    }
  }

  useEffect(() => {
    readRequests();
  }, []);

  const handleDelete = (id) => {
    Alert.alert("Confirm", "Are you sure you want to delete request: " + id, [
      {
        text: 'No',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => deleteRequest(id)
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Requests List</Text>

      <ScrollView contentContainerStyle={styles.list}>
        {requestsList.map((r) => (
          <View key={r.id} style={styles.card}>
            <Text style={styles.name}>{r.id} | {r.name}</Text>

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
            <Pressable onPress={() => handleDelete(r.id)}>
              <MaterialCommunityIcons name="trash-can-outline" size={30} color='#ff2525' />
            </Pressable>
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