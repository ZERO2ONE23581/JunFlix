import { Board, Following, Post, User } from '@prisma/client';

export interface BoardForm {
  title: string;
  intro: string;
  genre: string;
  avatar?: FileList;
}
export interface IGetBoardDetail {
  ok: boolean;
  error?: string;
  board?: BoardWithUserAndPost;
}
export interface BoardWithUserAndPost extends Board {
  user: User;
  posts: Post[];
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
