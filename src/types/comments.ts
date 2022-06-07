import { Comment, Post, User } from '@prisma/client';
export interface IGetAllComments {
  ok: boolean;
  error?: string;
  allComments: CommentWithUser[];
}
export interface CommentWithUser extends Comment {
  user: User;
}
export interface ICommentInfoProps {
  commentId: number | any;
}
export interface IGetCommentInfo {
  ok: boolean;
  error: string;
  comment: CommentWithUser;
}
export interface CommentWithUser extends Comment {
  user: User;
}
export interface ICreateCommentsForm {
  content?: string;
}
export interface ICommentPostRes {
  ok: boolean;
  error?: string;
}
export interface ICreateCommentsRes {
  ok: boolean;
  error?: string;
}
export interface ICreateReplyRes {
  ok: boolean;
  error?: string;
}
export interface IEditCommentRes {
  ok: boolean;
  error?: string;
}
export interface IEditCommentForm {
  content?: string;
}
export interface IGetReplies {
  ok: boolean;
  error: string;
  replies: Comment[];
}
export interface IRepliesProps {
  parentId: number | any;
}
