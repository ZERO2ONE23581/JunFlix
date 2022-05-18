import { User } from '@prisma/client';

export interface IFindForm {
  email?: string;
  userId?: string;
  tokenNum?: string;
  newPassword?: string;
  confirmPassword?: string;
  oldPassword?: string;
}

export interface ILoginForm {
  userId?: string;
  password?: string;
}
export interface IPostRes {
  ok?: boolean;
  error?: string;
  foundUser: User;
}
export interface ILoginRes {
  ok?: boolean;
  error?: string;
}
export interface ILoggedInUser {
  ok: boolean;
  loggedInUser?: User;
}
