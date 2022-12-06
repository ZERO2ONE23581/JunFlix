import {
  Board,
  Comment,
  Follower,
  Following,
  Like,
  Post,
  User,
} from '@prisma/client';
import { IRes } from './global';
import { Dispatch, SetStateAction } from 'react';

export interface IGetUser extends IRes {
  user: IUserType;
  loggedInUser?: IUserType;
}
export interface IUserType extends User {
  posts: Post[];
  boards: Board[];

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
  email: string;
  password: string;
  avatar?: FileList;
  new_password?: string;
  password_confirm: string;
  //
  name?: string;
  birth?: string;
  gender?: string;
  location?: string;
  username?: string;
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
export interface IUpdateUser {
  _data: {
    type: string;
    theme: boolean;
    User: IUserType;
    loading: boolean;
    update: ({}) => void;
    setLoading: Dispatch<SetStateAction<boolean>>;
  };
}
