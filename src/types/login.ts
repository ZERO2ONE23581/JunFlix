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
export interface ILoggedInUser {
  ok: boolean;
  loggedInUser?: User;
}
