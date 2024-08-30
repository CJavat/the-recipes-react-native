import 'react-native-gesture-handler';

import {useEffect} from 'react';
import {useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {Navigator} from './presentation/navigator/Navigator';
import {useThemeStore} from './presentation/store/theme/ThemeStore';

function TheRecipesApp(): React.JSX.Element {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const isDarkTheme = isDark ? true : false;

  const {toggleTheme, theme} = useThemeStore();

  useEffect(() => {
    toggleTheme(isDarkTheme);
  }, []);

  return (
    <NavigationContainer theme={theme}>
      <Navigator />
    </NavigationContainer>
  );
}

export default TheRecipesApp;
