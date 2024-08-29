import {Pressable, Text, View} from 'react-native';

import {StackScreenProps} from '@react-navigation/stack';
import tw from 'twrnc';

import {RootStackParams} from '../../navigator/Navigator';
import {useAuthStore} from '../../store/auth/AuthStore';

interface Props extends StackScreenProps<RootStackParams, 'Home'> {}

export const HomeScreen = ({navigation}: Props) => {
  const {logout} = useAuthStore();

  const onLogout = (): void => {
    logout();
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  return (
    <View>
      <Text style={tw`flex`}>Home Screen</Text>

      <Pressable
        onPress={onLogout}
        style={tw`rounded-md px-3 py-1.5 bg-sky-700`}>
        <Text style={tw`text-center uppercase font-bold text-white`}>
          Cerrar Sesión
        </Text>
      </Pressable>
    </View>
  );
};
