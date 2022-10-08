import { Board, Post, Review, User } from '@prisma/client';
import { IData } from './global';

export interface UserType extends User {
  posts: Post[];
  boards: Board[];
  review: Review[];
}
export interface IGetUser extends IData {
  user: UserType;
}
export interface IUserForm {
  userId?: string;
  password?: string;
  newPassword?: string;
  confirmPassword?: string;
  email?: string;
  name?: string;
  birth?: string;
  gender?: string;
  location?: string;
  username?: string;
  avatar?: FileList;
}
export interface IJoinForm {
  userId?: string;
  password?: string;
  confirmPassword?: string;
  username?: string;
  email?: string;
}
export interface IJoinFormRes extends IData {
  createdID: number;
}
export interface IUserIdCheckForm {
  userId: string;
}
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
  token?: string;
  password?: string;
  confirmPassword?: string;
}
export interface IFindPostRes {
  ok?: boolean;
  error?: string;
  FoundUserID?: string;
}
