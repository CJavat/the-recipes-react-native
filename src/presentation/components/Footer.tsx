import {useState} from 'react';
import {Text, View} from 'react-native';
import tw from 'twrnc';
import {useThemeStore} from '../store/theme/ThemeStore';

export const Footer = () => {
  const [date, setDate] = useState(new Date().getFullYear());
  const {isDark} = useThemeStore();

  return (
    <View
      style={tw`px-5 h-20 w-full border-t ${
        isDark ? 'border-t-sky-900 bg-sky-950' : 'border-t-sky-200 bg-sky-50'
      } flex items-center justify-center`}>
      <Text
        style={tw`${isDark ? 'text-white' : 'text-black'} font-bold text-xs`}>
        © {date} The Recipes - Todos los derechos reservados
      </Text>
    </View>
  );
};
