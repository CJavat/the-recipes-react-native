import {Pressable, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Ionicons';

import {AuthStackParams} from '../navigator/AuthNavigator';

export const Navbar = () => {
  const navigation = useNavigation<StackNavigationProp<AuthStackParams>>();

  return (
    <View style={tw``}>
      <Text>NavBar</Text>
    </View>
  );
};
