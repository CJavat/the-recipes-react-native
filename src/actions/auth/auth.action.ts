import axios, {AxiosError} from 'axios';
import {recipesApi} from '../../config/api/recipesApi';
import {
  LoginErrorResponse,
  LoginResponse,
  RegisterErrorResponse,
  RegisterResponse,
} from '../../infrastructure/interfaces';

interface RegisterUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const authLogin = async (email: string, password: string) => {
  email = email.toLowerCase();

  try {
    const {data} = await recipesApi.post<LoginResponse>('/auth/login', {
      email,
      password,
    });

    return {data, message: null};
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const {message, ...rest} = axiosError.response
        ?.data as LoginErrorResponse;

      return {
        data: null,
        message,
      };
    }
  }
};

export const authRegister = async (user: RegisterUser) => {
  try {
    const {data} = await recipesApi.post<RegisterResponse>(
      '/auth/register',
      user,
    );

    return {
      ok: true,
      message: [data.message],
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const {message, ...rest} = axiosError.response
        ?.data as RegisterErrorResponse;

      return {
        ok: false,
        message,
      };
    }
  }
};

export const authForgotPassword = async (email: string) => {
  try {
    const {data} = await recipesApi.post('/auth/forgot-password', {email});
    return {
      ok: true,
      message: data.message,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const {message, ...rest} = axiosError.response
        ?.data as RegisterErrorResponse;
      return {
        ok: false,
        message,
      };
    }

    return {
      ok: false,
      error,
    };
  }
};
