import { IRes } from './global';
import { Board, Follower, Following, Post, User } from '@prisma/client';

export interface IUseGetBoards {
  boards: IGetBoards;
}
export interface IBoardType extends Board {
  host: User;
  posts: Post[];
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
