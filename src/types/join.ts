import { Dispatch, SetStateAction } from 'react';
import { MutationRes } from './mutation';

export interface IJoinRes {
  ok?: boolean;
  error?: string;
}

export interface IJoinForm {
  userId: string;
  password: string;
  confirmPassword: string;
  username?: string;
  email?: string;
}
export interface IJoinFormRes extends MutationRes {
  createdID: number;
}
export interface IUserIdCheckForm {
  userId: string;
}

export interface IUserIdCheckRes extends MutationRes {
  userId?: string;
}
