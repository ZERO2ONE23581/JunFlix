import { IRes } from './global';
import { IPostType } from './post';
import { IUserType } from './user';
import { Board, Follower } from '@prisma/client';

export interface IBoardType extends Board {
  host: IUserType;
  posts: IPostType[];
  followers: Follower[];
  _count: {
    posts: number;
    followers: number;
  };
}
export interface IGetBoards extends IRes {
  boards?: IBoardType[];
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
}
