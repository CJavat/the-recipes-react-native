import {Text, TextInput} from 'react-native';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';
import {useThemeStore} from '../store/theme/ThemeStore';

//TODO: TERMINAR IMPLEMENTACIÓN
export const Search = () => {
  const {isDark} = useThemeStore();
  return (
    <View style={tw`w-full flex flex-row items-center`}>
      <View style={tw`relative w-full`}>
        <View style={tw`absolute bottom-0 pl-3`}>
          <Icon name="search-outline" style={tw`h-8 w-8`} />
        </View>

        <TextInput
          id="simple-search"
          style={tw`bg-transparent border border-sky-900 text-sm rounded-lg block w-full pl-7 flex-1 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
          placeholder="Buscar recetas"
        />
      </View>
    </View>
  );
};
