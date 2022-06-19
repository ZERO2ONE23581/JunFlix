import { Board, Following, Post, User } from '@prisma/client';

export interface IBoardForm {
  title: string;
  intro: string;
  genre: string;
  avatar?: FileList;
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
  boards?: BoardWithUser[];
}
export interface BoardWithUser extends Board {
  user: User;
  followers: FollowingWithUser[];
}
interface FollowingWithUser extends Following {
  user: User;
}
export interface IGetExistingBoards {
  ok: boolean;
  error?: string;
  boards?: BoardWithUser[];
}
