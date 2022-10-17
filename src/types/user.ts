import {
  Board,
  Comment,
  Follower,
  Following,
  Like,
  Post,
  Review,
  User,
} from '@prisma/client';
import { Dispatch, SetStateAction } from 'react';
import { IRes } from './global';

export interface IUserType extends User {
  posts: Post[];
  boards: Board[];
  reviews: Review[];
  likes: Like[];
  comments: Comment[];
  followers: Follower[];
  followings: Following[];
  _count: {
    posts: number;
    boards: number;
    reviews: number;
    likes: number;
    comments: number;
    followers: number;
    followings: number;
  };
}
export interface IGetUser extends IRes {
  user: IUserType;
}
export interface ICreateUser {
  isType: boolean;
  wrap: {
    theme: boolean;
    loading: boolean;
    post: ({}) => void;
    setLoading: Dispatch<SetStateAction<boolean>>;
    id?: {
      userId: string;
      user_id: number;
    };
  };
}
export interface IUserForm {
  name?: string;
  birth?: string;
  email?: string;
  userId?: string;
  gender?: string;
  avatar?: FileList;
  location?: string;
  username?: string;
  password?: string;
  newPassword?: string;
  pw_confirm?: string;
}
export interface IJoinForm {
  email?: string;
  userId?: string;
  username?: string;
  password?: string;
  pw_confirm?: string;
}
export interface IJoinFormRes extends IRes {
  createdID: number;
}
export interface IUserIdForm {
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
export interface IEditUser {
  dataWrap: {
    theme: boolean;
    type: string;
    loading: boolean;
    post: ({}) => void;
    setLoading: Dispatch<SetStateAction<boolean>>;
  };
}
