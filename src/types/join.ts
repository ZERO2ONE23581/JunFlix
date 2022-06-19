import { Dispatch, SetStateAction } from 'react';
import { MutationRes } from './mutation';

export interface IJoinRes {
  ok?: boolean;
  error?: string;
}
export interface IJoinFormProps {
  savedUserID: string;
  setCreatedID: Dispatch<SetStateAction<number>>;
  setOpenCreateAvatar: Dispatch<SetStateAction<boolean>>;
}
export interface IUserIdCheckProps {
  setOpenCreateUser: Dispatch<SetStateAction<boolean>>;
  setSavedUserID?: Dispatch<SetStateAction<string>> | any;
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
