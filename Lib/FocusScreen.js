import React from 'react';
import { View, Text, StyleSheet, Button, Linking, Alert } from 'react-native';

export default function FocusScreen({ route }) {
  const { entry } = route.params;

  const openInMaps = () => {
    if (!entry.location) return;
    const { latitude, longitude } = entry.location;
    const url = `geo:${latitude},${longitude}`;
    Linking.openURL(url).catch(err => Alert.alert("Can't open maps"));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{entry.title}</Text>
      <Text style={styles.desc}>{entry.description || '(No description)'}</Text>

      {entry.location && (
        <View style={styles.locationBox}>
          <Text style={styles.locationTitle}>📍 Position</Text>
          <Text>Lat: {entry.location.latitude.toFixed(4)}</Text>
          <Text>Lon: {entry.location.longitude.toFixed(4)}</Text>
          {entry.address && <Text>Address: {entry.address}</Text>}

          <View style={{marginTop: 15, height: 44}}>
            <Button 
              title="Open in Maps" 
              onPress={openInMaps} 
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  desc: {
    fontSize: 18,
    marginBottom: 20
  },
  locationBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 5
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  }
});