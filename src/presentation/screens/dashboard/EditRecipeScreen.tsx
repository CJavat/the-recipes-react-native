import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
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
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Picker} from '@react-native-picker/picker';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import {AxiosError} from 'axios';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Ionicons';

import {DashboardLayout} from '../../layouts/DashboardLayout';
import {BackButton} from '../../components/BackButton';

import {useThemeStore} from '../../store/theme/ThemeStore';
import {useRecipeStore} from '../../store/dashboard/RecipeStore';
import {useAuthStore} from '../../store/auth/AuthStore';

import {DashboardStackParams} from '../../navigator/DashboardNavigator';
import {API_URL} from '../../../config/api/recipesApi';
import {Recipe} from '../../../infrastructure/interfaces';

interface FormInput {
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  category: string;
}

export const EditRecipeScreen = () => {
  const {id} = useRoute<RouteProp<DashboardStackParams, 'EditRecipe'>>().params;
  const navigation = useNavigation<StackNavigationProp<DashboardStackParams>>();

  const [isPosting, setIsPosting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageSelected, setImageSelected] = useState<ImageOrVideo | null>(null);
  const [recipeImage, setRecipeImage] = useState('');
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isPressedButton, setIsPressedButton] = useState({
    addIngredientButton: false,
    addStepButton: false,
    updatePhotoButton: false,
    createRecipeButton: false,
  });

  const {isDark} = useThemeStore();
  const {user} = useAuthStore();
  const {categories, getCategories, getRecipe, updateRecipe} = useRecipeStore();
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<FormInput>();
  const {fields: ingredientFields, append: ingredientAppend} = useFieldArray({
    control,
    name: 'ingredients',
  });
  const {fields: stepFields, append: stepAppend} = useFieldArray({
    control,
    name: 'steps',
  });

  useEffect(() => {
    getCategories()
      .then()
      .catch(err => console.error(err));

    stepAppend('');
    ingredientAppend('');
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getRecipe(id)
      .then(recipe => {
        setRecipe(recipe);

        const backendUrl = API_URL.replace('/api', '');

        let imageUrl = '';
        if (recipe.image?.startsWith('http')) {
          imageUrl = recipe.image;
        } else {
          imageUrl = `${backendUrl}/${recipe.image}`;
        }
        setRecipeImage(`${imageUrl}?${new Date().getTime()}`);

        reset({
          title: recipe?.title ?? 'No title',
          description: recipe?.description ?? 'No description',
          ingredients: recipe?.ingredients ?? [],
          steps: recipe?.steps ?? [],
          category: recipe?.Category.id ?? 'No category',
        });
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);

        setIsLoading(false);
      });
  }, []);

  const pickImage = () => {
    ImagePicker.openPicker({
      width: 700,
      height: 700,
      cropping: true, // Permite el recorte
      mediaType: 'photo',
    })
      .then((image: ImageOrVideo) => {
        setImageSelected(image);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onSubmit: SubmitHandler<FormInput> = async data => {
    const {title, description, ingredients, steps, category} = data;
    setIsPosting(true);

    try {
      const formData = new FormData();

      if (imageSelected) {
        formData.append('file', {
          uri: imageSelected.path.startsWith('file://')
            ? imageSelected.path
            : `file://${imageSelected.path}`,
          type: imageSelected.mime || 'imageSelected/jpeg',
          name: imageSelected.filename || 'image.jpg',
        });
      }

      formData.append('title', title);
      formData.append('description', description);
      formData.append('categoryId', category);

      ingredients.forEach(ingredient => {
        formData.append('ingredients[]', ingredient);
      });
      steps.forEach(step => {
        formData.append('steps[]', step);
      });

      const resp = await updateRecipe(id, formData);

      Alert.alert('Receta Actualizada', 'Tu receta se actualizó exitosamente', [
        {
          text: 'Ok',
          onPress: () => navigation.reset({index: 0, routes: [{name: 'Home'}]}),
        },
      ]);
      return;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        Alert.alert('Error', error?.response?.data.message, [
          {text: 'Ok', onPress: () => navigation.replace('Home')},
        ]);
        return;
      }
      console.log(error);
      Alert.alert('Error Desconocido', 'No se pudo actualizar tu receta', [
        {text: 'Ok', onPress: () => navigation.replace('Home')},
      ]);
      return;
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <DashboardLayout>
      {isLoading ? (
        <View style={tw`flex-1 justify-center`}>
          <ActivityIndicator size={50} />
        </View>
      ) : (
        <>
          <BackButton />
          <ScrollView style={tw`my-2`} showsVerticalScrollIndicator={false}>
            <Text
              style={tw`mb-2 text-2xl ${isDark ? 'text-white' : 'text-black'}`}>
              Editar Receta - {recipe?.title}
            </Text>

            <View
              style={tw`mt-2 border-t ${
                isDark ? 'border-t-sky-900' : 'border-t-sky-300'
              }`}>
              <View style={tw`mt-5 mx-auto w-full max-w-sm`}>
                <View style={tw`gap-3`}>
                  {/* Imagen */}
                  <View
                    style={tw`mt-6 w-full mx-auto flex flex-col justify-center items-center gap-5`}>
                    {recipeImage ? (
                      <Image
                        alt={`${user?.firstName} ${user?.lastName}`}
                        source={{
                          uri: imageSelected ? imageSelected.path : recipeImage,
                        }}
                        style={tw`w-full rounded-full h-36 w-36 border border-sky-500`}
                      />
                    ) : (
                      <ActivityIndicator
                        size={60}
                        color={isDark ? '#F0F9FF' : '#082F49'}
                      />
                    )}

                    <Pressable
                      style={tw`w-full justify-center rounded-md px-3 py-1.5 flex-row justify-center items-center gap-3 ${
                        isPressedButton.updatePhotoButton
                          ? 'bg-sky-500'
                          : 'bg-sky-600'
                      }`}
                      onPressIn={() =>
                        setIsPressedButton(prevState => ({
                          ...prevState,
                          updatePhotoButton: true,
                        }))
                      }
                      onPressOut={() =>
                        setIsPressedButton(prevState => ({
                          ...prevState,
                          updatePhotoButton: false,
                        }))
                      }
                      onPress={pickImage}
                      disabled={isPosting}>
                      <Icon name="camera-outline" size={20} color="#FFF" />
                      <Text
                        style={tw`text-sm font-semibold text-center uppercase text-white`}>
                        Seleccionar Imagen
                      </Text>
                    </Pressable>
                  </View>

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
                        <Text style={tw`text-red-500`}>
                          {errors.title.message}
                        </Text>
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
                        <Icon
                          name="add-circle-outline"
                          size={20}
                          color="#FFF"
                        />
                        <Text
                          style={tw`text-center uppercase font-bold text-white`}>
                          Actualizar Receta
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
        </>
      )}
    </DashboardLayout>
  );
};
