import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';

// Correct imports based on your folder structure
// import DeliveryNavigator from './src/navigation/DeliveryNavigator';
import DispatchDeliveryScreen from './src/features/chef/orders/DispatchDeliveryScreen';
// import MyOrderScreen from './src/features/orders/MyOrderScreen';
// import TrackingScreen from './src/features/orders/TrackingScreen';
// import ChefMessageScreen from './src/features/chef/engagement/ChefMessageScreen';
// import ChefReviewScreen from './src/features/chef/engagement/ChefReviewScreen';
// import GlobalCallScreen from './src/features/GlobalCallScreen';
// import GlobalChatScreen from './src/features/GlobalChatScreen';

// Create the Stack Navigator
const Stack = createNativeStackNavigator();

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
    <>
      {/* Hides the top status bar globally on both iOS and Android */}
      <StatusBar hidden={true} />

      <NavigationContainer>
        {/* 
          The Stack.Navigator manages the routing history. 
          headerShown: false hides the default navigation bar since you built your own custom headers.
        */}
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          
          {/* Define all your screens here */}
          {/* <Stack.Screen name="DeliveryNavigator" component={DeliveryNavigator} /> */}
          <Stack.Screen name="DispatchDeliveryScreen" component={DispatchDeliveryScreen} />
          {/* <Stack.Screen name="MyOrderScreen" component={MyOrderScreen} /> */}
          {/* <Stack.Screen name="TrackingScreen" component={TrackingScreen} /> */}
          {/* <Stack.Screen name="ChefMessageScreen" component={ChefMessageScreen} /> */}
          {/* <Stack.Screen name="ChefReviewScreen" component={ChefReviewScreen} /> */}
          {/* <Stack.Screen name="GlobalCallScreen" component={GlobalCallScreen} /> */}
          {/* <Stack.Screen name="GlobalChatScreen" component={GlobalChatScreen} /> */}
          
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}