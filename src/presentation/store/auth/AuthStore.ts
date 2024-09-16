import {create} from 'zustand';
import {User} from '../../../domain/entities/user';
import {AuthStatus} from '../../../infrastructure/interfaces/auth-status.interface';
import {
  authForgotPassword,
  authLogin,
  authRegister,
  checkAuthStatus,
  reactivateAccount,
} from '../../../actions/auth/auth.action';
import {
  LoginResponse,
  ReactivateAccountResponse,
} from '../../../infrastructure/interfaces';
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
  reactivateAccount: (email: string) => Promise<ReactivateAccountResponse>;
  checkStatus: () => Promise<User>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  status: 'checking',
  token: undefined,
  user: undefined,

  //? Auth
  login: async (email, password) => {
    const resp = await authLogin(email, password);
    if (resp?.message) {
      set({status: 'unauthenticated', token: undefined, user: undefined});
      throw resp.message;
    }

    const user = resp!.data as LoginResponse;

    await StorageAdapter.setItem('token', user.token);
    set({status: 'authenticated', token: user.token, user: user});
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

  reactivateAccount: async email => {
    const resp = await reactivateAccount(email);

    if (!resp.ok) {
      set({status: 'unauthenticated', token: undefined, user: undefined});
      throw resp.message;
    }

    return resp;
  },

  checkStatus: async () => {
    const user = await checkAuthStatus();
    await StorageAdapter.setItem('token', user.token);
    set({status: 'authenticated', token: user.token, user: user});

    return user;
  },

  logout: async () => {
    try {
      await StorageAdapter.remove('token');
      set({status: 'unauthenticated', token: undefined, user: undefined});
    } catch (error) {
      throw new Error('Error removing token');
    }
  },

  //? Dashboard
}));
