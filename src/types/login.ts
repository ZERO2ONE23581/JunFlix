import { User } from '@prisma/client';

export interface ILoginForm {
  userId?: string;
  password?: string;
}
export interface ILoginRes {
  ok?: boolean;
  error?: string;
}
export interface ILoggedInUser {
  ok: boolean;
  loggedInUser?: User;
}
export interface IFindForm {
  email?: string;
  userId?: string;
  tokenNum?: string;
  newPassword?: string;
  confirmPassword?: string;
  oldPassword?: string;
}
export interface IFindPostRes {
  ok?: boolean;
  error?: string;
  foundUser: User;
}
