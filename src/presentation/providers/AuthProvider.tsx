import React, {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {PropsWithChildren, useEffect} from 'react';
import {useAuthStore} from '../store/auth/AuthStore';

import {RootStackParams} from '../navigator/RootNavigator';
import {ActivityIndicator, View} from 'react-native';
import tw from 'twrnc';
import {useThemeStore} from '../store/theme/ThemeStore';

export const AuthProvider = ({children}: PropsWithChildren) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const {checkStatus, status, logout, user} = useAuthStore();
  const {isDark} = useThemeStore();

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

  return status !== 'checking' ? (
    <>{children}</>
  ) : (
    <View
      style={tw`flex-1 items-center justify-center ${
        isDark ? 'bg-sky-950' : 'bg-sky-50'
      }  `}>
      <ActivityIndicator size={60} color={isDark ? '#F0F9FF' : '#082F49'} />
    </View>
  );
};
