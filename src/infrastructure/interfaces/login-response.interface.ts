export interface LoginResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  isActive: boolean;
  role: string;
  activationToken: string;
  createdAt: Date;
  updatedAt: Date | null;
  token: string;
}
