import {create} from 'zustand';
import {User} from '../../../domain/entities/user';
import {AuthStatus} from '../../../infrastructure/interfaces/auth-status.interface';

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  // login: ( email: string, password: string ) => Promise<boolean>;
  // signUp: ( fullName: string, email: string, password: string ) => Promise<boolean>
  // checkStatus: () => Promise<void>;
  // logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  status: 'checking',
  token: undefined,
  user: undefined,
}));
