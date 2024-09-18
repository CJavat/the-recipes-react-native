import {Button, Pressable, Text, View} from 'react-native';
import {RootStackParams} from '../../navigator/RootNavigator';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import tw from 'twrnc';

import {useAuthStore} from '../../store/auth/AuthStore';
import {DashboardLayout} from '../../layouts/DashboardLayout';
import {DashboardStackParams} from '../../navigator/DashboardNavigator';

export const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const navigationStack =
    useNavigation<StackNavigationProp<DashboardStackParams>>();

  const {logout} = useAuthStore();

  const onLogout = (): void => {
    logout();
    navigation.reset({
      index: 0,
      routes: [{name: 'Auth'}],
    });
  };

  return (
    <DashboardLayout>
      <Text>Home Screen</Text>

      <Button
        title="Menu"
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      />

      <Button
        title="Settings"
        onPress={() => navigationStack.navigate('Settings')}
      />

      <Pressable
        onPress={onLogout}
        style={tw`rounded-md px-3 py-1.5 bg-sky-700`}>
        <Text style={tw`text-center uppercase font-bold text-white`}>
          Cerrar Sesión
        </Text>
      </Pressable>
    </DashboardLayout>
  );
};
