import {
  User,
  Like,
  Post,
  Board,
  Comment,
  Follower,
  Following,
} from '@prisma/client';
import { IRes } from './global';
import { Dispatch, SetStateAction } from 'react';

export interface IGetUsers extends IRes {
  users: IUserType[];
}
export interface IGetUser extends IRes {
  user: IUserType;
  loggedInUser?: IUserType;
}
export interface IUserType extends User {
  likes: Like[];
  posts: Post[];
  boards: Board[];
  comments: Comment[];
  followers: Follower[];
  followings: Following[];
  _count: {
    posts: number;
    likes: number;
    boards: number;
    reviews: number;
    comments: number;
    followers: number;
    followings: number;
  };
}
export interface IUserForm {
  email: string;
  password: string;
  avatar?: FileList;
  new_password?: string;
  password_confirm: string;
  name?: string;
  token?: number;
  birth?: string;
  userId?: string;
  gender?: string;
  location?: string;
  username?: string;
}
export interface IFindID {
  ok?: boolean;
  error?: string;
  found?: string;
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
