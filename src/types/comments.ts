import { Comment, Post, User } from '@prisma/client';

export interface IGetPostInfo {
  ok: boolean;
  error?: string;
  isComments?: boolean;
  post: PostWithComments;
}
export interface PostWithComments extends Post {
  comments: Comment[];
  _count: {
    comments: number;
  };
}
export interface CommentsWithAttributes extends Comment {
  user: User;
}
export interface ICreateCommentsRes {
  ok: boolean;
  error?: string;
}
export interface IUpdateCommentsRes {
  ok: boolean;
  error?: string;
}
export interface ICreatePostCommentProps {
  userId?: string | string[];
  boardId?: string | string[];
  postId?: string | string[];
  loggedInUser?: User;
}
