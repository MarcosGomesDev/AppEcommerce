import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

const Stack = createNativeStackNavigator();

export function AppStack() {
  return <Stack.Navigator></Stack.Navigator>;
}
