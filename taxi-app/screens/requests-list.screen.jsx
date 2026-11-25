import { View, Text, StyleSheet, ScrollView, Pressable, Alert, TextInput, RefreshControl } from 'react-native';
import { useEffect, useState } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { query, where, or, and, getDocs, collection, doc, deleteDoc } from "firebase/firestore";

// import { getAllRequests, deleteRequest as removeRequest } from '../utils/db'; // SQLite
import { fireStoreDB } from '../utils/firebase.js';

const RequestsListScreen = () => {
  const [requestsList, setRequestsList] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const readRequests = () => {
    //Firebase code
    const term = searchText.trim();
    const end = term + '\uf8ff'; // "starts with" trick: from term up to term + highest character

    let q;
    if (term === '') {
      // no search text: get everything
      q = query(collection(fireStoreDB, 'requests'));
    } else {
      // match if name OR destination OR location starts with the search text
      q = query(
        collection(fireStoreDB, 'requests'),
        or(
          and(where('name', '>=', term), where('name', '<=', end)),
          and(where('destination', '>=', term), where('destination', '<=', end)),
          and(where('location', '>=', term), where('location', '<=', end))
        )
      );
    }

    return getDocs(q).then(snapshot => {
      // replace the list (not append) so reloading never duplicates items
      setRequestsList(snapshot.docs.map(d => ({ ...d.data(), id: d.id })));
    })

    // SQLite Code
    // setRequestsList(getAllRequests());
  }

  const deleteRequest = (id) => {
    // Firestore Code
    deleteDoc(doc(fireStoreDB, 'requests', id))
      .then(() => {
        readRequests();
        Alert.alert("Delete Success");
      })
      .catch(() => Alert.alert("Error", "Failed to delete the request"));

    /*
    ///////// SQLite Code
    const res = removeRequest(id);
    if (res.changes > 0) {
      readRequests();
      Alert.alert("Delete Success");
    }
    */
  }

  useEffect(() => {
    readRequests();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    readRequests()
      .catch(() => Alert.alert("Error", "Failed to refresh the list"))
      .finally(() => setRefreshing(false));
  }

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

      <View style={styles.searchBox}>
        <MaterialCommunityIcons name="magnify" size={22} color="#636e72" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search name, destination, location..."
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={() => readRequests()}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Pressable style={styles.searchButton} onPress={() => readRequests()}>
          <Text style={styles.searchButtonText}>Search</Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      >
        {requestsList.map((r) => (
          <View key={r.id} style={styles.card}>
            <Text style={styles.name}>{r.id} | {r.name}</Text>

            <View style={styles.row}>
              <Text style={styles.label}>Location:</Text>
              <Text style={styles.value}>{r.location}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Destination:</Text>
              <Text style={styles.value}>{r.destination}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Date:</Text>
              <Text style={styles.value}>
                {r.date.toDate().toLocaleString()}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Gender:</Text>
              <Text style={styles.value}>{r.gender}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Luggage:</Text>
              <Text style={styles.value}>{r.lugge}</Text>
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
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#dfe6e9',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    color: '#2d3436',
  },
  searchButton: {
    backgroundColor: '#0984e3',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  searchButtonText: {
    color: '#ffffff',
    fontWeight: '600',
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
