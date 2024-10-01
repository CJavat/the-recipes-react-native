import {AxiosError} from 'axios';
import {recipesApi} from '../../config/api/recipesApi';
import {
  FindUserResponse,
  UpdateUser,
  User,
} from '../../infrastructure/interfaces';

export const getUserProfile = async (id: string): Promise<FindUserResponse> => {
  try {
    const {data} = await recipesApi.get<FindUserResponse>(`/users/${id}`);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateUserProfile = async (
  id: string,
  body: UpdateUser,
): Promise<User> => {
  try {
    if (!id) throw 'ID o Token invalidos';

    const {data} = await recipesApi.patch<User>(`/users/${id}`, body);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updatePhoto = async (formData: FormData): Promise<User> => {
  try {
    const {data} = await recipesApi.patch<User>(
      '/users/change-image',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        transformRequest: formData => formData,
      },
    );

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(JSON.stringify(error, null, 3));
    }
    console.log(error);
    throw error;
  }
};

export const cancelAccount = async () => {
  try {
    const {data} = await recipesApi.delete<User>('/users/cancel-account');

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteAccount = async (): Promise<string> => {
  try {
    const {data} = await recipesApi.delete<string>('/users/permanently-delete');

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
