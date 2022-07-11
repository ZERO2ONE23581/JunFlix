import { Board, Following, Post, User } from '@prisma/client';
import { Dispatch, SetStateAction } from 'react';

export interface IBoard {
  board?: IBoardWithAttrs;
}
export interface IBoardForm {
  title: string;
  intro: string;
  genre: string;
  avatar?: FileList;
  boardAvatar?: FileList;
}
export interface IGetBoard {
  ok?: boolean;
  error?: string;
  board?: IBoardWithAttrs;
}
export interface IBoardWithAttrs extends Board {
  user: User;
  posts: Post[];
  followers: FollowingWithUser[];
  _count: {
    posts: number;
    followers: number;
  };
}
export interface IPostListProps {
  posts: Post[];
}
export interface IGetBoards {
  ok: boolean;
  error: string;
  boards?: IBoardWithAttrs[];
}
export interface BoardWithUser extends Board {
  user: User;
  followers: FollowingWithUser[];
}
interface FollowingWithUser extends Following {
  user: User;
}
export interface IEditBoardFormProps {
  setAvatar?: Dispatch<SetStateAction<string>> | any;
  setPreview: any;
  isEdit?: boolean;
  isCreate?: boolean;
}
export interface IBoardFormRes {
  ok: boolean;
  error?: string;
  board: Board;
}
export interface IBoardListProps {
  boards: IBoardWithAttrs[];
}
