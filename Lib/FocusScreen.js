import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FocusScreen({ route }) {
  const { entry } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{entry.title}</Text>
      <Text style={styles.desc}>{entry.description || '(No description)'}</Text>
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
  }
});