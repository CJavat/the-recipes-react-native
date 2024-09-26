import {
  TextInput,
  type TextInputSubmitEditingEventData,
  type NativeSyntheticEvent,
} from 'react-native';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';

import {useThemeStore} from '../store/theme/ThemeStore';
import {DashboardStackParams} from '../navigator/DashboardNavigator';
import {useState} from 'react';

export const Search = () => {
  const navigation = useNavigation<StackNavigationProp<DashboardStackParams>>();
  const {isDark} = useThemeStore();

  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmitEditing = async (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => {
    setSearchQuery(e.nativeEvent.text);

    if (searchQuery) {
      navigation.navigate('SearchRecipes', {title: searchQuery});
      setSearchQuery('');
    }
  };

  return (
    <View style={tw`w-full flex flex-row items-center`}>
      <View style={tw`relative w-full`}>
        <View style={tw`absolute bottom-0 pl-3`}>
          <Icon
            name="search-outline"
            style={tw`h-8 w-8 ${isDark ? 'text-gray-50' : 'text-gray-900'}`}
          />
        </View>

        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSubmitEditing}
          style={tw`bg-transparent border border-sky-900 text-sm rounded-lg w-full pl-7 ${
            isDark ? 'text-sky-50' : 'text-sky-900'
          }`}
          placeholder="Buscar recetas"
          placeholderTextColor={isDark ? '#F9FAFB' : '#111827'}
        />
      </View>
    </View>
  );
};
