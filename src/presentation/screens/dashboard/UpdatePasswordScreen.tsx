import {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Ionicons';
import {AxiosError} from 'axios';

import {DashboardLayout} from '../../layouts/DashboardLayout';
import {BackButton} from '../../components/BackButton';
import {Footer} from '../../components/Footer';

import {useThemeStore} from '../../store/theme/ThemeStore';

import {DashboardStackParams} from '../../navigator/DashboardNavigator';
import {useUserStore} from '../../store/dashboard/UserStore';
import {useAuthStore} from '../../store/auth/AuthStore';

interface FormInput {
  password: string;
}
type eyePassword = 'eye-outline' | 'eye-off-outline';

export const UpdatePasswordScreen = () => {
  const navigation = useNavigation<StackNavigationProp<DashboardStackParams>>();
  const {isDark} = useThemeStore();
  const {user} = useAuthStore();
  const {updateProfile} = useUserStore();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormInput>();

  const [isPosting, setIsPosting] = useState(false);
  const [passwordIcon, setPasswordIcon] =
    useState<eyePassword>('eye-off-outline');
  const [showPassword, setShowPassword] = useState(false);
  const [isPressedButton, setIsPressedButton] = useState({
    backButton: false,
    updatePassword: false,
  });

  const toggleShowPassword = async () => {
    setPasswordIcon(
      passwordIcon === 'eye-outline' ? 'eye-off-outline' : 'eye-outline',
    );

    setShowPassword(passwordIcon === 'eye-outline' ? false : true);
  };

  const onSubmit: SubmitHandler<FormInput> = async data => {
    const {password} = data;
    setIsPosting(true);
    if (!user?.id) return;

    try {
      const resp = await updateProfile(user.id, {password});

      Alert.alert(
        'Contraseña Actualizada',
        'Se ha actualizado tu contraseña correctamente',
        [{text: 'Ok', onPress: () => navigation.replace('Home')}],
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        Alert.alert('Error', error?.response?.data.message[0], [{text: 'Ok'}]);
        return;
      }
      console.log(error);
      Alert.alert('Error', 'No se pudo actualizar tu contraseña', [
        {text: 'Ok'},
      ]);
      return;
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <DashboardLayout>
      <View style={tw`mb-5 flex-1 justify-between`}>
        <View>
          <BackButton />

          <Text style={tw`text-2xl ${isDark ? 'text-white' : 'text-black'}`}>
            Actualizar Contraseña
          </Text>

          <View style={tw`mt-5 px-6`}>
            <View style={tw`w-full max-w-sm`}>
              <View style={tw`gap-6`}>
                <View>
                  <Text
                    style={tw`text-sm font-medium leading-6 ${
                      isDark ? 'text-sky-50' : 'text-sky-950'
                    }`}>
                    Password
                  </Text>

                  <View style={tw`mt-2`}>
                    <Controller
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: 'La contraseña es obligatoria',
                        },
                        minLength: {
                          value: 6,
                          message:
                            'La contraseña debe tener al menos 6 caracteres',
                        },
                      }}
                      render={({field: {onChange, onBlur, value}}) => (
                        <>
                          <TextInput
                            style={tw`w-full rounded-md pl-3 py-1.5 border border-sky-500 ${
                              isDark ? 'text-sky-50' : 'text-sky-950'
                            }`}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Escribe la contraseña"
                            secureTextEntry={!showPassword}
                            placeholderTextColor="#0EA5E9"
                          />

                          <Pressable
                            onPress={toggleShowPassword}
                            style={tw`absolute top-1 right-3 z-10`}>
                            <Icon
                              name={passwordIcon}
                              size={30}
                              color="#0EA5E9"
                            />
                          </Pressable>
                        </>
                      )}
                      name="password"
                      defaultValue=""
                    />
                    {errors.password && (
                      <Text style={tw`text-red-500`}>
                        {errors.password.message}
                      </Text>
                    )}
                  </View>
                </View>

                <Pressable
                  onPressIn={() =>
                    setIsPressedButton(prevState => ({
                      ...prevState,
                      updatePassword: true,
                    }))
                  }
                  onPressOut={() =>
                    setIsPressedButton(prevState => ({
                      ...prevState,
                      updatePassword: false,
                    }))
                  }
                  onPress={handleSubmit(onSubmit)}
                  disabled={isPosting}
                  style={tw`flex-row justify-center items-center gap-2 rounded-md px-3 py-1.5 ${
                    isPressedButton.updatePassword ? 'bg-sky-500' : 'bg-sky-700'
                  }`}>
                  {!isPosting ? (
                    <>
                      <Icon
                        name="sync-circle-outline"
                        size={20}
                        style={tw`font-bold text-white`}
                      />
                      <Text style={tw`uppercase font-bold text-white`}>
                        Actualizar contraseña
                      </Text>
                    </>
                  ) : (
                    <ActivityIndicator color={'#FFF'} animating={isPosting} />
                  )}
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        <Footer />
      </View>
    </DashboardLayout>
  );
};
