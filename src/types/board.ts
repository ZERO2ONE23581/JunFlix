import { Board, Post, User } from '@prisma/client';

export interface BoardForm {
  title: string;
  intro: string;
  genre: string;
  avatar?: string;
  follow?: string;
}
export interface IGetBoardDetail {
  ok: boolean;
  error?: string;
  board?: BoardWithUserAndPost;
}
export interface BoardWithUserAndPost extends Board {
  user: User;
  post: Post[];
}
export interface IPostListProps {
  posts: Post[];
}
export interface IEditBoardForm {
  title?: string;
  intro?: string;
  genre?: string;
}
export interface IGetBoards {
  ok: boolean;
  error: string;
  boards?: BoardWithUser[];
}
export interface BoardWithUser extends Board {
  user: User;
}
