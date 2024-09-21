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
import {StackScreenProps} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import {AuthStackParams} from '../../navigator/AuthNavigator';

import {useThemeStore} from '../../store/theme/ThemeStore';
import {useAuthStore} from '../../store/auth/AuthStore';

interface FormInput {
  email: string;
}
interface Props extends StackScreenProps<AuthStackParams, 'ForgotPassword'> {}

export const ForgotPassword = ({navigation}: Props) => {
  const {isDark} = useThemeStore();
  const {user, checkStatus, forgotPassword} = useAuthStore();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormInput>();

  const theRecipesLogo = require('../../../assets/logos/android-chrome-512x512.png');

  const [isPressedButton, setIsPressedButton] = useState({
    backButton: false,
    forgotPassword: false,
  });
  const [isPosting, setIsPosting] = useState(false);

  const onSubmit: SubmitHandler<FormInput> = async data => {
    const {email} = data;
    setIsPosting(true);

    try {
      const message = await forgotPassword(email);

      Alert.alert('Se ha enviado la solicitud', message as unknown as string, [
        {
          text: 'OK',
          onPress: () => {
            navigation.replace('Login');
          },
        },
      ]);
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
        <Pressable
          onPressIn={() =>
            setIsPressedButton(prevState => ({...prevState, backButton: true}))
          }
          onPressOut={() =>
            setIsPressedButton(prevState => ({...prevState, backButton: false}))
          }
          style={tw`absolute top-5 left-1 flex flex-row items-center px-3 rounded `}
          onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-back-outline"
            size={40}
            style={tw`${
              isPressedButton.backButton ? 'text-sky-500' : 'text-sky-700'
            }`}
          />
        </Pressable>

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
              Recuperar Contraseña
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

              <Pressable
                onPressIn={() =>
                  setIsPressedButton(prevState => ({
                    ...prevState,
                    forgotPassword: true,
                  }))
                }
                onPressOut={() =>
                  setIsPressedButton(prevState => ({
                    ...prevState,
                    forgotPassword: false,
                  }))
                }
                onPress={handleSubmit(onSubmit)}
                disabled={isPosting}
                style={tw`rounded-md px-3 py-1.5 ${
                  isPressedButton.forgotPassword ? 'bg-sky-500' : 'bg-sky-700'
                }`}>
                {!isPosting ? (
                  <Text style={tw`text-center uppercase font-bold text-white`}>
                    Recuperar contraseña
                  </Text>
                ) : (
                  <ActivityIndicator color={'#FFF'} animating={isPosting} />
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
