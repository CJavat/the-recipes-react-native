import {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Ionicons';
import {StackNavigationProp} from '@react-navigation/stack';

import {RootStackParams} from '../../navigator/RootNavigator';

import {useThemeStore} from '../../store/theme/ThemeStore';
import {useAuthStore} from '../../store/auth/AuthStore';
import {useNavigation} from '@react-navigation/native';
import {AuthStackParams} from '../../navigator/AuthNavigator';

interface FormInput {
  email: string;
  password: string;
}

type eyePassword = 'eye-outline' | 'eye-off-outline';
const theRecipesLogo = require('../../../assets/logos/android-chrome-512x512.png');

export const LoginScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const authNavigation = useNavigation<StackNavigationProp<AuthStackParams>>();

  const {isDark} = useThemeStore();
  const {login} = useAuthStore();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormInput>();

  const [isPressedButton, setIsPressedButton] = useState({
    forgotPasswordButton: false,
    registerAccountButton: false,
    reactivateAccountButton: false,
    loginButton: false,
  });

  const [passwordIcon, setPasswordIcon] =
    useState<eyePassword>('eye-off-outline');
  const [showPassword, setShowPassword] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const toggleShowPassword = async () => {
    setPasswordIcon(
      passwordIcon === 'eye-outline' ? 'eye-off-outline' : 'eye-outline',
    );

    setShowPassword(passwordIcon === 'eye-outline' ? false : true);
  };

  const onSubmit: SubmitHandler<FormInput> = async data => {
    const {email, password} = data;
    setIsPosting(true);

    try {
      await login(email, password);
      return navigation.replace('Drawer');
    } catch (error) {
      console.log(error);

      Alert.alert('Error Al Ingresar', error as string, [{text: 'OK'}]);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={tw`flex flex-col justify-center px-6 py-12 lg:px-8`}>
          <View style={tw`mx-auto w-full max-w-sm`}>
            <Image
              style={tw`mx-auto h-28 w-28 rounded-2xl`}
              source={theRecipesLogo}
              alt="The Recipes Logo"
            />
            <Text
              style={tw`mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-sky-500 ${
                isDark ? 'text-sky-50' : 'text-sky-950'
              }`}>
              Iniciar Sesión
            </Text>
          </View>

          <View style={tw`mt-10 mx-auto w-full max-w-sm`}>
            <View style={tw`gap-6`}>
              {/* Email */}
              <View>
                <Text
                  style={tw`text-sm font-medium leading-6 ${
                    isDark ? 'text-sky-50' : 'text-sky-950'
                  }`}>
                  Email
                </Text>
                <View style={tw`mt-2`}>
                  <Controller
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: 'El correo es obligatorio',
                      },
                      pattern: {
                        value:
                          /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
                        message: 'Escribe un correo válido',
                      },
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput
                        style={tw`w-full rounded-md border-0 pl-3 py-1.5 shadow-sm ${
                          isDark ? 'text-sky-50' : 'text-sky-950'
                        }`}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Escribe el correo"
                        keyboardType="email-address"
                      />
                    )}
                    name="email"
                    defaultValue=""
                  />
                  {errors.email && (
                    <Text style={tw`text-red-500`}>{errors.email.message}</Text>
                  )}
                </View>
              </View>

              {/* Password */}
              <View>
                <View style={tw`flex flex-row items-center justify-between`}>
                  <Text
                    style={tw`text-sm font-medium leading-6 ${
                      isDark ? 'text-sky-50' : 'text-sky-950'
                    }`}>
                    Contraseña
                  </Text>

                  <Pressable
                    onPressIn={() =>
                      setIsPressedButton(prevState => ({
                        ...prevState,
                        forgotPasswordButton: true,
                      }))
                    }
                    onPressOut={() =>
                      setIsPressedButton(prevState => ({
                        ...prevState,
                        forgotPasswordButton: false,
                      }))
                    }
                    onPress={() => authNavigation.push('ForgotPassword')}>
                    <Text
                      style={tw`text-sm font-semibold ${
                        isPressedButton.forgotPasswordButton
                          ? 'text-sky-500'
                          : 'text-sky-700'
                      }`}>
                      ¿Olvidaste tu contraseña?
                    </Text>
                  </Pressable>
                </View>
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
                          style={tw`w-full rounded-md border-0 pl-3 py-1.5 shadow-sm ${
                            isDark ? 'text-sky-50' : 'text-sky-950'
                          }`}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          placeholder="Escribe la contraseña"
                          secureTextEntry={!showPassword}
                        />

                        <Pressable
                          onPress={toggleShowPassword}
                          style={tw`absolute top-1 right-3 z-10`}>
                          <Icon name={passwordIcon} size={30} />
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
                    loginButton: true,
                  }))
                }
                onPressOut={() =>
                  setIsPressedButton(prevState => ({
                    ...prevState,
                    loginButton: false,
                  }))
                }
                onPress={handleSubmit(onSubmit)}
                disabled={isPosting}
                style={tw`rounded-md px-3 py-1.5 ${
                  isPressedButton.loginButton ? 'bg-sky-500' : 'bg-sky-700'
                }`}>
                {!isPosting ? (
                  <Text style={tw`text-center uppercase font-bold text-white`}>
                    Ingresar
                  </Text>
                ) : (
                  <ActivityIndicator color={'#FFF'} animating={isPosting} />
                )}
              </Pressable>
            </View>

            {/* Register Screen */}
            <Text style={tw`mt-10 text-center text-gray-500`}>
              ¿Aún no estás registrado?
            </Text>
            <Pressable
              onPressIn={() =>
                setIsPressedButton(prevState => ({
                  ...prevState,
                  registerAccountButton: true,
                }))
              }
              onPressOut={() =>
                setIsPressedButton(prevState => ({
                  ...prevState,
                  registerAccountButton: false,
                }))
              }
              onPress={() => authNavigation.replace('Register')}>
              <Text
                style={tw`font-semibold leading-6 text-center ${
                  isPressedButton.registerAccountButton
                    ? 'text-sky-500'
                    : 'text-sky-700'
                }`}>
                Crea una cuenta gratis aquí.
              </Text>
            </Pressable>

            {/* Reactivate Account Screen */}
            <Text style={tw`mt-3 text-center text-gray-500`}>
              ¿Tu cuenta no está activa?
            </Text>
            <Pressable
              onPressIn={() =>
                setIsPressedButton(prevState => ({
                  ...prevState,
                  reactivateAccountButton: true,
                }))
              }
              onPressOut={() =>
                setIsPressedButton(prevState => ({
                  ...prevState,
                  reactivateAccountButton: false,
                }))
              }
              onPress={() => authNavigation.navigate('ReactivateAccount')}>
              <Text
                style={tw`font-semibold leading-6 text-center ${
                  isPressedButton.reactivateAccountButton
                    ? 'text-sky-500'
                    : 'text-sky-700'
                }`}>
                Actívala aquí.
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
