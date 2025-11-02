import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { EntriesProvider } from './Lib/EntriesStore';
import LogbookScreen from './Lib/LogbookScreen';
import FocusScreen from './Lib/FocusScreen';
import NewMarkerScreen from './Lib/NewMarkerScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <EntriesProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Logbook"
            component={LogbookScreen}
            options={{ title: 'Logbook' }}
          />
          <Stack.Screen
            name="Focus"
            component={FocusScreen}
            options={{ title: 'Focus' }}
          />
          <Stack.Screen
            name="NewMarker"
            component={NewMarkerScreen}
            options={{ title: 'New Marker' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </EntriesProvider>
  );
}