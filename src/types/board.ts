import { Dispatch, SetStateAction } from 'react';
import { Board, Following, Post, User } from '@prisma/client';

export interface IBoardType extends Board {
  user: User;
  posts: Post[];
}
export interface IBoard {
  board: IBoardType;
  isFollowing: boolean;
  setPreview: Dispatch<SetStateAction<string>>;
}
export interface IBoardForm {
  title: string;
  genre: string;
  avatar?: FileList;
  description: string;
  boardAvatar?: FileList;
}
export interface IGetBoard {
  ok?: boolean;
  error?: string;
  isFollowing?: boolean;
  board?: IBoardType;
}
interface FollowingWithUser extends Following {
  user: User;
}
export interface IGetBoards {
  ok: boolean;
  error: string;
  boards?: IBoardType[];
}
export interface IBoardFormRes {
  ok: boolean;
  error?: string;
  board: Board;
}
export interface IBoardList {
  size: number;
  boards: IBoardType[];
}
export interface IGetFollowingBoard {
  ok: boolean;
  error?: string;
  isFollowing?: boolean;
  board: BoardWithRecords;
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
export interface IFollowBoardProps {
  isMyBoard?: boolean;
  user_id?: number | null;
  board_id?: number | null;
}
export interface IGetFollowInfo {
  ok: boolean;
  error?: string;
  following?: FollowingWith[];
}
export interface FollowingWith extends Following {
  board: Board;
  user: User;
}
