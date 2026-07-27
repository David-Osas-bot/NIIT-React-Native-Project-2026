import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import AuthNavigator from './AuthNavigator';
import CustomerNavigator from './CustomerNavigator';
import ChefNavigator from './ChefNavigator';

export default function RootNavigator() {
  const [session, setSession] = useState({ role: 'customer' }); // TEMP: bypass auth for testing my part
  return (
    <NavigationContainer>
      {!session ? (
        <AuthNavigator />
      ) : session.role === 'chef' ? (
        <ChefNavigator />
      ) : (
        <CustomerNavigator />
      )}
    </NavigationContainer>
  );
}