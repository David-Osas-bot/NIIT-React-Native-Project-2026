import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import CustomerNavigator from './CustomerNavigator';
import ChefNavigator from './ChefNavigator';
import { useAuth } from '../features/auth/authContext';

export default function RootNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return null; // or a loading spinner
  }

  return (
    <NavigationContainer>
      {!user ? (
        <AuthNavigator />
      ) : user.role === 'chef' ? (
        <ChefNavigator />
      ) : (
        <CustomerNavigator />
      )}
    </NavigationContainer>
  );
}