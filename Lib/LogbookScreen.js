import React, { useContext } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { EntriesContext } from './EntriesStore';

export default function LogbookScreen({ navigation }) {
    const { entries } = useContext(EntriesContext);

  return (
    <View style={styles.container}>
      <Button
        title="Add New Marker"
        onPress={() => navigation.navigate('NewMarker')}
      />
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.noteItem}
            onPress={() => navigation.navigate('Focus', { entry: item })}>
            <Text style={styles.noteTitle}>{item.title}</Text>
            {item.location && <Text>📍</Text>} 
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  noteItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
    noteTitle: {
    fontSize: 18
  }
});