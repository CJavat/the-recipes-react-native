import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {PropsWithChildren, useEffect} from 'react';
import {useAuthStore} from '../store/auth/AuthStore';

import {RootStackParams} from '../navigator/RootNavigator';

export const AuthProvider = ({children}: PropsWithChildren) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const {checkStatus, status, logout} = useAuthStore();

  useEffect(() => {
    checkStatus();
  }, []);

  useEffect(() => {
    if (status !== 'checking') {
      if (status === 'authenticated') {
        navigation.reset({
          index: 0,
          routes: [{name: 'Drawer'}],
        });
      } else {
        logout();
        navigation.reset({
          index: 0,
          routes: [{name: 'Auth'}],
        });
      }
    }
  }, [status]);

  return <>{children}</>;
};
