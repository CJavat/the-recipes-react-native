import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Picker} from '@react-native-picker/picker';
import {AxiosError} from 'axios';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Ionicons';

import {DashboardLayout} from '../../layouts/DashboardLayout';
import {BackButton} from '../../components/BackButton';

import {useThemeStore} from '../../store/theme/ThemeStore';
import {useRecipeStore} from '../../store/dashboard/RecipeStore';

import {DashboardStackParams} from '../../navigator/DashboardNavigator';

interface FormInput {
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  category: string;
}

export const CreateRecipeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<DashboardStackParams>>();
  const {isDark} = useThemeStore();
  const {categories, getCategories, createRecipe} = useRecipeStore();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormInput>();
  const {fields: ingredientFields, append: ingredientAppend} = useFieldArray({
    control,
    name: 'ingredients',
  });
  const {fields: stepFields, append: stepAppend} = useFieldArray({
    control,
    name: 'steps',
  });

  const [isPosting, setIsPosting] = useState(false);
  const [isPressedButton, setIsPressedButton] = useState({
    addIngredientButton: false,
    addStepButton: false,
    createRecipeButton: false,
  });

  useEffect(() => {
    getCategories()
      .then()
      .catch(err => console.error(err));

    stepAppend('');
    ingredientAppend('');
  }, []);

  const onSubmit: SubmitHandler<FormInput> = async data => {
    setIsPosting(true);

    //TODO: Aquí comporbar si existe una imagen cargada

    try {
      //TODO: Mandar a llamar la petición al backend.
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response);
        Alert.alert('Error', error?.response?.data.message, [
          {text: 'Ok', onPress: () => navigation.replace('MyAccount')},
        ]);
        return;
      }
      console.log(error);
      Alert.alert('Error Desconocido', 'No se pudo actualizar tu foto', [
        {text: 'Ok', onPress: () => navigation.replace('MyAccount')},
      ]);
      return;
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <DashboardLayout>
      <BackButton />
      <ScrollView style={tw`my-2`} showsVerticalScrollIndicator={false}>
        <Text style={tw`mb-2 text-2xl ${isDark ? 'text-white' : 'text-black'}`}>
          Crear Receta
        </Text>

        <View
          style={tw`mt-2 border-t ${
            isDark ? 'border-t-sky-900' : 'border-t-sky-300'
          }`}>
          <View style={tw`mt-5 mx-auto w-full max-w-sm`}>
            <View style={tw`gap-6`}>
              {/*
                //TODO: Poner la función de cargar la imagen y agregarla al useState.
              */}
              {/* Título */}
              <View>
                <Text
                  style={tw`text-sm font-medium leading-6 ${
                    isDark ? 'text-sky-50' : 'text-sky-950'
                  }`}>
                  Título
                </Text>
                <View style={tw`mt-2`}>
                  <Controller
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: 'El título es obligatorio',
                      },
                      minLength: {
                        value: 3,
                        message: 'Escribe al menos 3 caracteres',
                      },
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput
                        style={tw`w-full rounded-md border border-sky-500 pl-3 py-1.5 ${
                          isDark ? 'text-sky-50' : 'text-sky-950'
                        }`}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Título de la receta"
                      />
                    )}
                    name="title"
                    defaultValue=""
                  />
                  {errors.title && (
                    <Text style={tw`text-red-500`}>{errors.title.message}</Text>
                  )}
                </View>
              </View>

              {/* Descripción */}
              <View>
                <Text
                  style={tw`text-sm font-medium leading-6 ${
                    isDark ? 'text-sky-50' : 'text-sky-950'
                  }`}>
                  Descripción
                </Text>
                <View style={tw`mt-2`}>
                  <Controller
                    control={control}
                    rules={{}}
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput
                        style={tw`w-full rounded-md border border-sky-500 pl-3 py-1.5 ${
                          isDark ? 'text-sky-50' : 'text-sky-950'
                        }`}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Escribe tu apellido"
                      />
                    )}
                    name="description"
                    defaultValue=""
                  />
                  {errors.description && (
                    <Text style={tw`text-red-500`}>
                      {errors.description.message}
                    </Text>
                  )}
                </View>
              </View>

              {/* Ingredientes */}
              <View>
                <Text
                  style={tw`text-sm font-medium leading-6 mb-2 ${
                    isDark ? 'text-sky-50' : 'text-sky-950'
                  }`}>
                  Ingredientes
                </Text>

                {ingredientFields.map((item, index) => (
                  <Controller
                    key={item.id}
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput
                        style={tw`mb-3 w-full rounded-md border border-sky-500 pl-3 py-1.5 ${
                          isDark ? 'text-sky-50' : 'text-sky-950'
                        }`}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Ingrese un ingrediente"
                      />
                    )}
                    name={`ingredients.${index}`} // Nombre del campo
                    rules={{required: true}} // Validación
                  />
                ))}
                {errors.ingredients && (
                  <Text style={tw`text-red-500`}>
                    Los ingredientes son obligatorios
                  </Text>
                )}

                <Pressable
                  style={tw`flex-row items-center justify-center gap-2 uppercase mt-3 w-full flex justify-center items-center rounded-md border border-sky-600 px-3 py-1.5 leading-6 ${
                    isPressedButton.addIngredientButton
                      ? 'bg-sky-500'
                      : 'bg-transparent'
                  }`}
                  onPressIn={() =>
                    setIsPressedButton(prevState => ({
                      ...prevState,
                      addIngredientButton: true,
                    }))
                  }
                  onPressOut={() =>
                    setIsPressedButton(prevState => ({
                      ...prevState,
                      addIngredientButton: false,
                    }))
                  }
                  onPress={() => ingredientAppend('')} // Agregar un nuevo campo
                >
                  <Icon
                    name="add-outline"
                    size={20}
                    style={tw`${
                      isPressedButton.addIngredientButton
                        ? 'text-sky-50'
                        : 'text-sky-500'
                    }`}
                  />
                  <Text
                    style={tw`text-sm font-semibold ${
                      isPressedButton.addIngredientButton
                        ? 'text-sky-50'
                        : 'text-sky-500'
                    }`}>
                    Agregar Ingrediente
                  </Text>
                </Pressable>
              </View>

              {/* Pasos */}
              <View>
                <Text
                  style={tw`text-sm font-medium leading-6 mb-2 ${
                    isDark ? 'text-sky-50' : 'text-sky-950'
                  }`}>
                  Pasos
                </Text>

                {stepFields.map((item, index) => (
                  <Controller
                    key={item.id}
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput
                        style={tw`mb-3 w-full rounded-md border border-sky-500 pl-3 py-1.5 ${
                          isDark ? 'text-sky-50' : 'text-sky-950'
                        }`}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Ingrese un paso"
                      />
                    )}
                    name={`steps.${index}`} // Nombre del campo
                    rules={{required: true}} // Validación
                  />
                ))}
                {errors.steps && (
                  <Text style={tw`text-red-500`}>
                    Los pasos son obligatorios
                  </Text>
                )}

                <Pressable
                  style={tw`flex-row items-center justify-center gap-2 uppercase mt-3 w-full flex justify-center items-center rounded-md border border-sky-600 px-3 py-1.5 leading-6 ${
                    isPressedButton.addStepButton
                      ? 'bg-sky-500'
                      : 'bg-transparent'
                  }`}
                  onPressIn={() =>
                    setIsPressedButton(prevState => ({
                      ...prevState,
                      addStepButton: true,
                    }))
                  }
                  onPressOut={() =>
                    setIsPressedButton(prevState => ({
                      ...prevState,
                      addStepButton: false,
                    }))
                  }
                  onPress={() => stepAppend('')} // Agregar un nuevo campo
                >
                  <Icon
                    name="add-outline"
                    size={20}
                    style={tw`${
                      isPressedButton.addStepButton
                        ? 'text-sky-50'
                        : 'text-sky-500'
                    }`}
                  />
                  <Text
                    style={tw`text-sm font-semibold ${
                      isPressedButton.addStepButton
                        ? 'text-sky-50'
                        : 'text-sky-500'
                    }`}>
                    Agregar Pasos
                  </Text>
                </Pressable>
              </View>

              {/* Categoría */}
              <View>
                <Text
                  style={tw`text-sm font-medium leading-6 mb-2 ${
                    isDark ? 'text-sky-50' : 'text-sky-950'
                  }`}>
                  Categoría
                </Text>
                <View style={tw`w-full border border-sky-500 rounded-md`}>
                  <Controller
                    control={control}
                    name="category"
                    rules={{required: 'La categoría es obligatoria'}}
                    render={({field: {onChange, value}}) => (
                      <Picker
                        selectedValue={value}
                        onValueChange={onChange}
                        style={tw`w-full`}>
                        <Picker.Item
                          label="Seleccione una categoría"
                          value=""
                          style={tw`text-sky-500`}
                        />
                        {categories?.map(category => (
                          <Picker.Item
                            key={category.id}
                            label={category.name}
                            value={category.id}
                            style={tw`text-sky-500 `}
                          />
                        ))}
                      </Picker>
                    )}
                  />
                </View>
                {errors.category && (
                  <Text style={tw`text-red-500`}>
                    {errors.category.message}
                  </Text>
                )}
              </View>

              <Pressable
                onPressIn={() =>
                  setIsPressedButton(prevState => ({
                    ...prevState,
                    createRecipeButton: true,
                  }))
                }
                onPressOut={() =>
                  setIsPressedButton(prevState => ({
                    ...prevState,
                    createRecipeButton: false,
                  }))
                }
                onPress={handleSubmit(onSubmit)}
                disabled={isPosting}
                style={tw`flex-row items-center justify-center gap-2 rounded-md px-3 py-1.5 ${
                  isPressedButton.createRecipeButton
                    ? 'bg-sky-500'
                    : 'bg-sky-700'
                }`}>
                {!isPosting ? (
                  <>
                    <Icon name="add-circle-outline" size={20} color="#FFF" />
                    <Text
                      style={tw`text-center uppercase font-bold text-white`}>
                      Crear Receta
                    </Text>
                  </>
                ) : (
                  <ActivityIndicator color={'#FFF'} animating={isPosting} />
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </DashboardLayout>
  );
};
