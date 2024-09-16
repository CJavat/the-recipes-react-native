import {useState} from 'react';
import {Text, View} from 'react-native';
import tw from 'twrnc';

export const Footer = () => {
  const [date, setDate] = useState(new Date().getFullYear());

  return (
    <View
      style={tw`px-5 h-20 w-full bg-sky-50 dark:bg-sky-950 border-t border-t-sky-200 dark:border-t-sky-900 flex items-center justify-center`}>
      <Text style={tw`text-black dark:text-white font-bold text-xs`}>
        © {date} The Recipes - Todos los derechos reservados
      </Text>
    </View>
  );
};
