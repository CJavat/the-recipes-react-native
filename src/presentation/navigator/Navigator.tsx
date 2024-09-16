import {createStackNavigator} from '@react-navigation/stack';

import {HomeScreen} from '../screens/dashboard/HomeScreen';
import {LoginScreen} from '../screens/auth/LoginScreen';
import {RegisterScreen} from '../screens/auth/RegisterScreen';
import {ForgotPassword} from '../screens/auth/ForgotPassword';
import {ReactivateAccount} from '../screens/auth/ReactivateAccount';

export type RootStackParams = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ReactivateAccount: undefined;

  Home: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const Navigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ReactivateAccount" component={ReactivateAccount} />

      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};
