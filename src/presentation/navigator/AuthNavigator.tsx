import {createStackNavigator} from '@react-navigation/stack';

import {LoginScreen} from '../screens/auth/LoginScreen';
import {RegisterScreen} from '../screens/auth/RegisterScreen';
import {ForgotPassword} from '../screens/auth/ForgotPassword';
import {ReactivateAccount} from '../screens/auth/ReactivateAccount';

export type AuthStackParams = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ReactivateAccount: undefined;
};

const Auth = createStackNavigator<AuthStackParams>();

export const AuthNavigator = () => {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Auth.Screen name="Login" component={LoginScreen} />
      <Auth.Screen name="Register" component={RegisterScreen} />
      <Auth.Screen name="ForgotPassword" component={ForgotPassword} />
      <Auth.Screen name="ReactivateAccount" component={ReactivateAccount} />
    </Auth.Navigator>
  );
};
