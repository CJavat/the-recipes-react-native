export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date | null;
}
