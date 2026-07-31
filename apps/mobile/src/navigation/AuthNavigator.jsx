import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../features/auth/SplashScreen';
import OnboardingScreen from '../features/auth/OnboardingScreen';
import LoginScreen from '../features/auth/LoginScreen';
import SignupScreen from '../features/auth/SignupScreen';
import ForgotPasswordScreen from '../features/auth/ForgotPasswordScreen';
import VerificationScreen from '../features/auth/VerificationScreen';
import LocationScreen from '../features/location/LocationScreen';
import RoleSelectorScreen from '../features/auth/RoleSelector';
import DriverLoginScreen from '../features/auth/DriverLoginScreen';
import ChefLoginScreen from '../features/auth/ChefLogin';
import resetPassword  from '../features/auth/ResetPassword';
import { StackScreen } from 'react-native-screens';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Verification" component={VerificationScreen} />
      <Stack.Screen name="Location" component={LocationScreen} />
      <Stack.Screen name="Role" component={RoleSelectorScreen}/>
      <Stack.Screen name="DriverLogin" component={DriverLoginScreen} />
      <Stack.Screen name="ChefLogin" component={ChefLoginScreen} />
      <Stack.Screen name="resetPassword" component={resetPassword}/>
    </Stack.Navigator>
  );
}