import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button, Text, View} from 'react-native';
import {DashboardStackParams} from '../../navigator/DashboardNavigator';
import {DashboardLayout} from '../../layouts/DashboardLayout';

export const RecipesScreen = () => {
  const navigationStack =
    useNavigation<StackNavigationProp<DashboardStackParams>>();

  return (
    <DashboardLayout>
      <Text>RecipesScreen</Text>

      <Button
        title="Settings"
        onPress={() => navigationStack.navigate('Settings')}
      />
    </DashboardLayout>
  );
};
