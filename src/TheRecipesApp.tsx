import React from 'react';
import {Text, useColorScheme} from 'react-native';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return <Text>Hola Mundo2</Text>;
}

export default App;
