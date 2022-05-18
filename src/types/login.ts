import { User } from '@prisma/client';

export interface ILoginForm {
  userId?: string;
  password?: string;
}
export interface ILoginRes {
  ok?: boolean;
  error?: string;
}
export interface IFindIdRes extends ILoginRes {}
export interface ITokenRes extends ILoginRes {
  foundUserId?: string;
}
export interface ILoggedInUser {
  ok: boolean;
  loggedInUser?: User;
}
