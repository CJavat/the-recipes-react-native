import {createStackNavigator} from '@react-navigation/stack';

import {AuthNavigator} from './AuthNavigator';
import {DrawerNavigator} from './DrawerNavigator';

export type RootStackParams = {
  Auth: undefined;
  Drawer: undefined;
};

const RootStack = createStackNavigator<RootStackParams>();

export const RootNavigator = () => {
  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Screen name="Auth" component={AuthNavigator} />
      <RootStack.Screen name="Drawer" component={DrawerNavigator} />
    </RootStack.Navigator>
  );
};
