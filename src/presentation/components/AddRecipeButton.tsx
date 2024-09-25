import {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Ionicons';

import {DashboardStackParams} from '../navigator/DashboardNavigator';

export const AddRecipeButton = () => {
  const navigation = useNavigation<StackNavigationProp<DashboardStackParams>>();

  const [isPressedButton, setIsPressedButton] = useState(false);

  return (
    <Pressable
      style={tw`flex-row gap-2 justify-center items-center my-3 p-2 rounded-md ${
        isPressedButton ? 'bg-sky-700' : 'bg-sky-500'
      }`}
      onPressIn={() => setIsPressedButton(true)}
      onPressOut={() => setIsPressedButton(false)}
      onPress={() => navigation.navigate('CreateRecipe')}>
      <Icon name="add-outline" size={30} color="#FFF" />
      <Text style={tw`text-center text-white text-lg`}>Nueva Receta</Text>
    </Pressable>
  );
};
