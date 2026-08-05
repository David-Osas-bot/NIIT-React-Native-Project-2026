import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChefNavigator from './ChefNavigator';
import CustomerNavigator from './CustomerNavigator';
import AuthNavigator from './AuthNavigator';

import HomeScreen from '../features/home/HomeScreen';
import PersonalProfileScreen from '../features/profile/PersonalProfileScreen';
import EditProfileScreen from '../features/profile/EditProfileScreen';
import PaymentWithdrawalScreen from '../features/chef/payments/PaymentWithdrawalScreen';
import WithdrawalScreen from '../features/chef/payments/WithdrawalScreen';
import RunningOrdersScreen from '../features/chef/orders/RunningOrdersScreen';
import LoginScreen from '../features/auth/LoginScreen';
import PlaceholderModalScreen from '../shared/PlaceholderModalScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  // TEMP: replace with real session/role state once auth store is built
  const [session, setSession] = useState(null); // null | { role: 'customer' | 'chef' }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ChefTabs" screenOptions={{ headerShown: false }}>
        {/* Main Tab Navigators */}
        <Stack.Screen name="ChefTabs" component={ChefNavigator} />
        <Stack.Screen name="CustomerTabs" component={CustomerNavigator} />

        {/* Full auth flow (Splash -> Onboarding -> Login/Signup/etc.) — was
            previously an orphaned file with nothing pointing to it. Reached
            via navigate('Auth') or navigate('Auth', { screen: 'Signup' }).
            NOT the current initialRouteName — see the note above about
            whether the app should actually boot here now. */}
        <Stack.Screen name="Auth" component={AuthNavigator} />

        {/* Auth */}
        <Stack.Screen name="Login" component={LoginScreen} />

        {/* Shared screens reachable from both chef and customer flows */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PersonalProfile" component={PersonalProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        {/* Alias: ChefMenuScreen's "Personal Info" row calls
            navigate('PersonalInfo') specifically (not 'PersonalProfile') —
            registering the same screen under both names avoids also having
            to edit ChefMenuScreen.jsx. */}
        <Stack.Screen name="PersonalInfo" component={PersonalProfileScreen} />

        {/* Chef-only screens that were imported in ChefNavigator.jsx but
            never actually registered as reachable routes anywhere. */}
        <Stack.Screen name="Withdrawal" component={WithdrawalScreen} />
        <Stack.Screen name="RunningOrders" component={RunningOrdersScreen} />

        {/* Placeholder modals for routes with no real screen built yet.
            Each is the same reusable component with different title/icon
            passed via initialParams — see PlaceholderModalScreen.jsx. */}
        <Stack.Screen
          name="Settings"
          component={PlaceholderModalScreen}
          initialParams={{ title: 'Settings', icon: 'settings' }}
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen
          name="ChefReview"
          component={PlaceholderModalScreen}
          initialParams={{ title: 'Reviews', icon: 'star' }}
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen
          name="Favourite"
          component={PlaceholderModalScreen}
          initialParams={{ title: 'Favourites', icon: 'heart' }}
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen
          name="Notifications"
          component={PlaceholderModalScreen}
          initialParams={{ title: 'Notifications', icon: 'bell' }}
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen
          name="FAQs"
          component={PlaceholderModalScreen}
          initialParams={{ title: 'FAQs', icon: 'help-circle' }}
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen
          name="UserReviews"
          component={PlaceholderModalScreen}
          initialParams={{ title: 'User Reviews', icon: 'star' }}
          options={{ presentation: 'modal' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}