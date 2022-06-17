import { User } from '@prisma/client';

export interface ILoginForm {
  userId?: string;
  password?: string;
}
export interface ILoggedInUser {
  ok: boolean;
  loggedInUser?: User;
}
export interface IFindForm {
  email?: string;
  userId?: string;
  tokenNum?: string;
  password?: string;
  confirmPassword?: string;
}
export interface IFindPostRes {
  ok?: boolean;
  error?: string;
  FoundUserID?: string;
}
