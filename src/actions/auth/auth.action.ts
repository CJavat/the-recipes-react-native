import axios, {AxiosError} from 'axios';
import {recipesApi} from '../../config/api/recipesApi';
import {
  LoginErrorResponse,
  LoginResponse,
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
      console.log(error);
      const axiosError = error as AxiosError;
      const loginError = axiosError.response?.data as LoginErrorResponse;

      return {
        data: null,
        message: loginError?.message ?? ['Ocurrió un error desconocido'],
      };
    }

    return {
      data: null,
      message: ['Ocurrió un error desconocido'],
    };
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
      message: ['Se creó tu cuenta correctamente'],
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const loginError = axiosError.response?.data as LoginErrorResponse;

      return {
        ok: false,
        message: loginError?.message ?? ['Ocurrió un error desconocido'],
      };
    }

    return {
      ok: false,
      message: ['Ocurrió un error desconocido'],
    };
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
      const loginError = axiosError.response?.data as LoginErrorResponse;

      return {
        ok: false,
        message: loginError?.message ?? ['Ocurrió un error desconocido'],
      };
    }

    return {
      ok: false,
      message: ['Ocurrió un error desconocido'],
    };
  }
};

export const reactivateAccount = async (email: string) => {
  try {
    const {data} = await recipesApi.post('/users/reactivate-account', {email});

    return {
      ok: true,
      message: data.message,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const loginError = axiosError.response?.data as LoginErrorResponse;

      return {
        ok: false,
        message: loginError?.message ?? ['Ocurrió un error desconocido'],
      };
    }

    return {
      ok: false,
      message: ['Ocurrió un error desconocido'],
    };
  }
};

export const checkAuthStatus = async () => {
  try {
    const {data} = await recipesApi.get('/auth/check-token');

    return data;
  } catch (error) {
    console.log(error);

    throw ['Ha ocurrido un error'];
  }
};
