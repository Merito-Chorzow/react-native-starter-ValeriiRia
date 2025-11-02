import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { EntriesContext } from './EntriesStore';
import * as Location from 'expo-location';
import axios from 'axios';

export default function NewMarkerScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');
  const { addEntry } = useContext(EntriesContext);

  const handleGetLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied');
      return;
    }
    let loc = await Location.getCurrentPositionAsync({});
    setLocation(loc.coords);

    try {
      let addressResult = await Location.reverseGeocodeAsync(loc.coords);
      if (addressResult && addressResult.length > 0) {
        const adr = addressResult[0];
        const fullAddress = `${adr.street || ''}, ${adr.city || ''}`;
        setAddress(fullAddress);
        Alert.alert('Location Added!', fullAddress);
      }
    } catch (e) {
      Alert.alert('Address Error');
    }
  };

  const handleFetchQuote = () => {
    axios.get('https://dummyjson.com/quotes/random')
      .then(response => {
          if (response.data && response.data.quote) {
            setDescription(response.data.quote); 
          }
      })
      .catch(error => {
          console.error("API ERROR:", error); 
          Alert.alert('API Error');
      });
  };

  const handleSave = () => {
    if (!title) {
      Alert.alert('Title is required');
      return;
    }
    addEntry({ title, description, location, address });
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

        <Button title="Get Quote from API" onPress={handleFetchQuote} />
        <View style={{ marginVertical: 10 }} />
      <Button title="Get GPS & Address" onPress={handleGetLocation} />

      {location && <Text>Lat: {location.latitude.toFixed(4)}, Lon: {location.longitude.toFixed(4)}</Text>}
      {address && <Text style={{fontWeight: 'bold'}}>Address: {address}</Text>}
      
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