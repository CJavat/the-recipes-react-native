import {create} from 'zustand';
import {
  FindUserResponse,
  UpdateUser,
  User,
} from '../../../infrastructure/interfaces';
import {
  cancelAccount,
  deleteAccount,
  getUserProfile,
  updatePhoto,
  updateUserProfile,
} from '../../../actions/user/user.action';

export interface UserState {
  getUser: (id: string) => Promise<FindUserResponse>;
  updateProfile: (id: string, body: UpdateUser) => Promise<User>;
  updatePhoto: (formData: FormData) => Promise<User>;
  cancelAccount: () => Promise<CancelDeleteAccount>;
  deleteAccount: () => Promise<CancelDeleteAccount>;
}

interface CancelDeleteAccount {
  ok: boolean;
  message: string;
}

export const useUserStore = create<UserState>()((set, get) => ({
  getUser: async id => {
    try {
      const resp = await getUserProfile(id);
      return resp;
    } catch (error) {
      throw error;
    }
  },

  updateProfile: async (id, body) => {
    try {
      const resp = await updateUserProfile(id, body);
      return resp;
    } catch (error) {
      throw error;
    }
  },

  updatePhoto: async formData => {
    try {
      const resp = await updatePhoto(formData);
      return resp;
    } catch (error) {
      throw error;
    }
  },

  cancelAccount: async () => {
    try {
      await cancelAccount();
      return {ok: true, message: 'Cuenta desactivada correctamente'};
    } catch (error) {
      return {ok: false, message: 'Tu cuenta no se pudo desactivar'};
    }
  },

  deleteAccount: async () => {
    try {
      const resp = await deleteAccount();
      return {ok: true, message: 'Cuenta eliminada correctamente'};
    } catch (error) {
      return {ok: true, message: 'Tu cuenta no se pudo eliminar'};
    }
  },
}));
