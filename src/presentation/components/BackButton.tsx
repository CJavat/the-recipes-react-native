import {useState} from 'react';
import {Pressable} from 'react-native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Ionicons';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {DashboardStackParams} from '../navigator/DashboardNavigator';

export const BackButton = () => {
  const navigation = useNavigation<StackNavigationProp<DashboardStackParams>>();
  const [isPressedButton, setIsPressedButton] = useState(false);

  return (
    <Pressable
      onPressIn={() => setIsPressedButton(true)}
      onPressOut={() => setIsPressedButton(false)}
      style={tw`mt-2 -ml-1`}
      onPress={() => navigation.goBack()}>
      <Icon
        name="arrow-back-outline"
        size={40}
        style={tw`${isPressedButton ? 'text-sky-500' : 'text-sky-700'}`}
      />
    </Pressable>
  );
};
