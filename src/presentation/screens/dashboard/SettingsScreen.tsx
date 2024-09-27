import {useState} from 'react';
import {ActivityIndicator, Pressable, Text, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';

import {DashboardLayout} from '../../layouts/DashboardLayout';

import {useThemeStore} from '../../store/theme/ThemeStore';

import {DashboardStackParams} from '../../navigator/DashboardNavigator';
import {Footer} from '../../components/Footer';

interface SettingRoutes {
  icon: string;
  label: string;
  path: string;
}

export const SettingsScreen = () => {
  const navigation = useNavigation<StackNavigationProp<DashboardStackParams>>();
  const {isDark} = useThemeStore();

  const [isLoading, setIsLoading] = useState(false);
  const [isPressedButton, setIsPressedButton] = useState<string | null>(null);

  const settingPaths: SettingRoutes[] = [
    {
      icon: 'lock-closed-outline',
      label: 'Actualizar Contraseña',
      path: 'UpdatePassword',
    },
    {
      icon: 'person-remove-outline',
      label: 'Eliminar Cuenta',
      path: 'DeleteAccount',
    },
  ];

  return (
    <DashboardLayout>
      {isLoading ? (
        <View style={tw`flex-1 justify-center`}>
          <ActivityIndicator size={50} />
        </View>
      ) : (
        <View style={tw`my-2 flex-1 justify-between`}>
          <View>
            <Text style={tw`text-2xl ${isDark ? 'text-white' : 'text-black'}`}>
              Cofiguraciones
            </Text>

            <View style={tw`w-full px-5`}>
              {settingPaths.map(({icon, label, path}) => (
                <Pressable
                  key={path}
                  style={tw`my-3 p-2 flex-row justify-between items-center gap-5 border rounded-md ${
                    isPressedButton === path
                      ? 'border-sky-700'
                      : 'border-sky-500'
                  }`}
                  onPressIn={() => setIsPressedButton(path)}
                  onPressOut={() => setIsPressedButton(null)}
                  onPress={() => navigation.navigate(path)}>
                  <Icon
                    name={icon}
                    size={30}
                    style={tw`${
                      isPressedButton === path
                        ? 'text-sky-700'
                        : 'text-sky-500 '
                    }`}
                  />
                  <Text
                    style={tw`flex-1 text-lg ${
                      isPressedButton === path
                        ? 'text-sky-700'
                        : 'text-sky-500 '
                    }`}>
                    {label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <Footer />
        </View>
      )}
    </DashboardLayout>
  );
};
