import {create} from 'zustand';
import {User} from '../../../domain/entities/user';
import {AuthStatus} from '../../../infrastructure/interfaces/auth-status.interface';
import {
  authForgotPassword,
  authLogin,
  authRegister,
} from '../../../actions/auth/auth.action';
import {LoginResponse} from '../../../infrastructure/interfaces';
import {StorageAdapter} from '../../../config/adapter/storage.adapter';

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  login: (email: string, password: string) => Promise<boolean>;
  signUp: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => Promise<string[]>;
  forgotPassword: (email: string) => Promise<string[]>;
  // checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  status: 'checking',
  token: undefined,
  user: undefined,

  login: async (email, password) => {
    const resp = await authLogin(email, password);
    if (resp?.message) {
      set({status: 'unauthenticated', token: undefined, user: undefined});
      throw resp.message[0];
    }

    const {token, ...user} = resp!.data as LoginResponse;

    await StorageAdapter.setItem('token', token);
    set({status: 'authenticated', token: token, user: user});
    return true;
  },

  signUp: async (firstName, lastName, email, password) => {
    const resp = await authRegister({firstName, lastName, email, password});

    if (!resp!.ok) {
      set({status: 'unauthenticated', token: undefined, user: undefined});
      throw resp!.message[0];
    }

    return resp!.message;
  },

  forgotPassword: async email => {
    const resp = await authForgotPassword(email);
    if (!resp.ok) throw resp.message;

    return resp.message;
  },

  logout: async () => {
    try {
      await StorageAdapter.remove('token');
      set({status: 'unauthenticated', token: undefined, user: undefined});
    } catch (error) {
      throw new Error('Error removing token');
    }
  },
}));
