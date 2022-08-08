import { Dispatch, SetStateAction } from 'react';
import { Board, Following, Post, User } from '@prisma/client';

export interface IBoard {
  board: IBoardWithAttrs;
  isFollowing: boolean;
  setText: Dispatch<SetStateAction<boolean>>;
  setPreview: Dispatch<SetStateAction<string>>;
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
  isFollowing?: boolean;
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
interface FollowingWithUser extends Following {
  user: User;
}
export interface IGetBoards {
  ok: boolean;
  error: string;
  boards?: IBoardWithAttrs[];
}
export interface IBoardFormRes {
  ok: boolean;
  error?: string;
  board: Board;
}
export interface IBoardList {
  size: number;
  boards: IBoardWithAttrs[];
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
