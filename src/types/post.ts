import { Board, Comment, Like, Post, Review, User } from '@prisma/client';
import { FieldError, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { IBoardType } from './board';
import { IRes } from './global';
import { IUserType } from './user';

export interface IPostType extends Post {
  user: IUserType;
  board: IBoardType;
  likes: Like[];
  comments: Comment[];
  _count: {
    likes: number;
    comments: number;
  };
}
export interface ICreatePostRes extends IRes {
  post_id: number;
}
export interface IPostComment {
  ok?: boolean;
  error?: string;
  post: IPostType;
}
export interface IPostList {
  size: number;
  from: number;
  isBlur?: boolean;
  isLikesType?: boolean;
  postsArray: IPostType[];
}
export interface LikesWithPost extends Like {
  post: Post;
}

export interface IPost {
  post: IPostType;
}
export interface IGetPost extends IPost {
  ok?: boolean;
  error?: string;
}
export interface ReviewModel extends Review {
  _count: {
    likes: number;
    comments: number;
  };
  user?: User;
  board?: Board;
}
export interface IPostForm {
  title: string;
  pageLink?: string;
  hashtags?: string;
  onPrivate?: boolean;
  description?: string;
  post_image?: FileList;
}
export interface IPostFormErr {
  title?: FieldError | undefined;
  pageLink?: FieldError | undefined;
  hashtags?: FieldError | undefined;
  onPrivate?: FieldError | undefined;
  description?: FieldError | undefined;
  post_image?: FieldError | undefined;
}
export interface ICreatePostForm {
  isNext: boolean;
  theme: boolean;
  errors: IPostFormErr;
  watch: UseFormWatch<IPostForm>;
  register: UseFormRegister<IPostForm>;
}
export interface IGetAllPosts {
  ok: boolean;
  posts?: IPostType[];
}
