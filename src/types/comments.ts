import { PostModel } from './post';
import { Comment, User } from '@prisma/client';

export interface IPostComment {
  ok?: boolean;
  error?: string;
  post: PostModel;
}
export interface IDataID {
  USERID: number;
  BOARDID: number;
  POSTID: number;
  REVIEWID: number;
}
export interface IGetAllComments {
  ok: boolean;
  error?: string;
  allComments: CommentWithUser[];
}
export interface CommentWithUser extends Comment {
  user: User;
}

export interface IGetCommentInfo {
  ok: boolean;
  error: string;
  comment: CommentWithUser;
}
export interface CommentWithUser extends Comment {
  user: User;
}
export interface ICmtForm {
  content?: string;
}
export interface ICmtRes {
  ok: boolean;
  error?: string;
  DeletedID?: number;
}
export interface IEditCommentForm {
  content?: string;
}
export interface IGetReplies {
  ok: boolean;
  error: string;
  replies: Comment[];
}
