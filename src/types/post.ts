import { Board, Post, User } from '@prisma/client';
import { Dispatch, SetStateAction } from 'react';
import { LikesWithPost, LikesWithReview } from './likes';

export interface IGetPost {
  ok: boolean;
  error?: string;
  isComments?: boolean;
  post: PostModel;
}
export interface PostModel extends Post {
  user?: User;
  board?: Board;
}
export interface IEditPostForm extends IPostForm {
  createdAt?: Date;
}
export interface IPostForm {
  title?: string;
  content?: string;
  createdAt?: Date;
  avatar?: FileList;
}
export interface IGetAllPosts {
  ok: boolean;
  posts?: Post[];
  postlikes: LikesWithPost[];
  reviewLikes: LikesWithReview[];
}
