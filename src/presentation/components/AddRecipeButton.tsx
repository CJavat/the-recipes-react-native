import {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import tw from 'twrnc';

import {DashboardStackParams} from '../navigator/DashboardNavigator';

export const AddRecipeButton = () => {
  const navigation = useNavigation<StackNavigationProp<DashboardStackParams>>();

  const [isPressedButton, setIsPressedButton] = useState(false);

  return (
    <Pressable
      style={tw`my-3 p-2 rounded-md ${
        isPressedButton ? 'bg-sky-700' : 'bg-sky-500'
      }`}
      onPressIn={() => setIsPressedButton(true)}
      onPressOut={() => setIsPressedButton(false)}
      onPress={() => navigation.navigate('CreateRecipe')}>
      <Text style={tw`text-center text-white`}>Nueva Receta</Text>
    </Pressable>
  );
};
