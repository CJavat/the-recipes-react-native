export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  isActive: boolean;
  role?: string;
  activationToken: string | null;
  createdAt: Date;
  updatedAt?: Date | null;
  token: string;
}
