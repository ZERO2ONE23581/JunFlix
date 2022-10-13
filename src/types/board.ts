import { Dispatch, SetStateAction } from 'react';
import { Board, Follower, Following, Post, User } from '@prisma/client';
import { IRes } from './global';

export interface IBoardType extends Board {
  host: User;
  posts: Post[];
  followers: Follower[];
}
export interface IGetBoard extends IRes {
  board?: IBoardType;
}
export interface IBoardForm {
  title: string;
  genre?: string;
  avatar?: FileList;
  isPrivate?: boolean;
  description?: string;
  boardAvatar?: FileList;
}
interface FollowingWithUser extends Following {
  user: User;
}
export interface BoardWithRecords extends Board {
  user: User;
  followers?: Following[];
  post?: Post[];
  _count: {
    followers: number;
    posts: number;
  };
}
