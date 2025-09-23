import React from 'react';
import { View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <AppNavigator />
    </View>
  );
}