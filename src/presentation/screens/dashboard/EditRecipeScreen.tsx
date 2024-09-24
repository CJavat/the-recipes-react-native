import {Text, View} from 'react-native';

import {RouteProp, useRoute} from '@react-navigation/native';

import {DashboardStackParams} from '../../navigator/DashboardNavigator';

//TODO: TERMINAR ESTE COMPONENTE
export const EditRecipeScreen = () => {
  const {id, isFavorite} =
    useRoute<RouteProp<DashboardStackParams, 'EditRecipe'>>().params;

  return (
    <View>
      <Text>EditRecipeScreen</Text>
      <Text>ID: {id}</Text>
      <Text>Is Favorite: {isFavorite}</Text>
    </View>
  );
};
