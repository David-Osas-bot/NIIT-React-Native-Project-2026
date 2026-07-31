import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import AuthNavigator from './AuthNavigator';
import CustomerNavigator from './CustomerNavigator';
import ChefNavigator from './ChefNavigator';

export default function RootNavigator() {
  // TEMP: replace with real session/role state once auth store is built
  const [session, setSession] = useState(null); // null | { role: 'customer' | 'chef' }

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