import 'react-native-gesture-handler';

import {useEffect} from 'react';
import {Appearance, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {RootNavigator} from './presentation/navigator/RootNavigator';

import {useThemeStore} from './presentation/store/theme/ThemeStore';
import {AuthProvider} from './presentation/providers/AuthProvider';

function TheRecipesApp(): React.JSX.Element {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const isDarkTheme = isDark ? true : false;

  const {theme, toggleTheme, setTheme} = useThemeStore();

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      setTheme(colorScheme ?? 'light');
    });

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    toggleTheme(isDarkTheme);
  }, []);

  return (
    <NavigationContainer theme={theme}>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}

export default TheRecipesApp;
