import { Comments, Post, Replies, User } from '@prisma/client';

export interface IGetPostInfo {
  ok: boolean;
  error?: string;
  isComments?: boolean;
  post: PostWithComments;
}
export interface PostWithComments extends Post {
  comments: CommentsWithAttributes[];
  _count: {
    comments: number;
  };
}
export interface CommentsWithAttributes extends Comments {
  user: User;
  replies: Replies[];
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
