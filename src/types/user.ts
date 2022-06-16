import { User } from '@prisma/client';

export interface IEditUserIdForm {
  userId?: string;
}
export interface IEditProfileProps {
  user?: User;
}
