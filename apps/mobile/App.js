import 'react-native-gesture-handler'; // MUST be the very first import, before anything else
import { useEffect } from 'react';
import { Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import { AuthProvider } from './src/features/auth/authContext';

export default function App() {

  useEffect(() => {
    // This hides the bottom digital buttons on Android
    const setFullScreen = async () => {
      if (Platform.OS === 'android') {
        await NavigationBar.setVisibilityAsync('hidden');
        // 'overlay-swipe' allows users to temporarily swipe up from the bottom to see the buttons if they need them
        await NavigationBar.setBehaviorAsync('overlay-swipe');
      }
    };

    setFullScreen();
  }, []);

  return (
    <AuthProvider>
      <SafeAreaProvider>
        <RootNavigator />
      </SafeAreaProvider>
    </AuthProvider>
  );
}