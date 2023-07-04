import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { AuthStack } from './AuthStack';

export function Router() {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
}
