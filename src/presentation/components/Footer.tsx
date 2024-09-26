import {useState} from 'react';
import {Text, View} from 'react-native';
import tw from 'twrnc';
import {useThemeStore} from '../store/theme/ThemeStore';

export const Footer = () => {
  const [date, setDate] = useState(new Date().getFullYear());
  const {isDark} = useThemeStore();

  return (
    <View
      style={tw`px-5 py-2 w-full border-t border-t-sky-500 ${
        isDark ? 'bg-sky-950' : 'bg-sky-50'
      } flex items-center justify-center`}>
      <Text
        style={tw`${isDark ? 'text-white' : 'text-black'} font-bold text-xs`}>
        © {date} The Recipes - Todos los derechos reservados
      </Text>
    </View>
  );
};
