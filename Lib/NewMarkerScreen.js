import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { EntriesContext } from './EntriesStore';

export default function NewMarkerScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
    const { addEntry } = useContext(EntriesContext);

  const handleSave = () => {
    if (!title) {
      Alert.alert('Title is required');
      return;
    }
    addEntry({ title, description });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Marker Title" value={title} onChangeText={setTitle} />
      <TextInput 
        style={[styles.input, styles.textArea]} 
        placeholder="Thoughts..." 
        value={description} 
        onChangeText={setDescription} 
        multiline />

      <View style={{ marginTop: 20, height: 48 }}>
        <Button title="Save Marker" onPress={handleSave} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top'
  }
});