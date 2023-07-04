import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Error404 } from '../screens/404';
import { Login } from '../screens/Login';

const Stack = createNativeStackNavigator();

export function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="NotFoundScreen" component={Error404} />
      <Stack.Screen name="LoginScreen" component={Login} />
    </Stack.Navigator>
  );
}
