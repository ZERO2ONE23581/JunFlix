import { MutationRes } from './mutation';

export interface IJoinRes {
  ok?: boolean;
  error?: string;
}
export interface IJoinFormProps {
  confirmId: boolean;
  joinSuccess: boolean;
  UserId: string;
  setJoinSuccess: any;
  setCreatedID: any;
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
export interface IUserIdCheckProps {
  confirmId: boolean;
  setConfirmId: any;
  setUserId: any;
}
export interface IUserIdCheckRes extends MutationRes {
  userId?: string;
}
export interface ICreateProfileAvatarProps {
  joinSuccess: boolean;
  createdID: number;
}
export interface ICreateProfileAvatar {
  avatar?: FileList;
}
