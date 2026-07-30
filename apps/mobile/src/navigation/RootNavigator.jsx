import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import AuthNavigator from './AuthNavigator';
import CustomerNavigator from './CustomerNavigator';
import ChefNavigator from './ChefNavigator';

export default function RootNavigator() {
  // const [session, setSession] = useState(null);
  // Temporarily mock a customer session
  const [session, setSession] = useState({ role: 'customer' });
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