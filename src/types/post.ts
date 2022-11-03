import { Board, Comment, Like, Post, Review, User } from '@prisma/client';
import {
  FieldError,
  UseFormClearErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  UseFormSetError,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { IBoardType } from './board';
import { IRes } from './global';
import { IUserType } from './user';

export interface IPostUseform {
  _useform: {
    errors?: {
      title?: FieldError | any;
      chosenId?: FieldError | any;
      pageLink?: FieldError | any;
      hashtags?: FieldError | any;
      onPrivate?: FieldError | any;
      post_image?: FieldError | any;
      description?: FieldError | any;
    };
    reset?: UseFormReset<IPostForm>;
    watch?: UseFormWatch<IPostForm>;
    setError?: UseFormSetError<IPostForm>;
    register?: UseFormRegister<IPostForm>;
    setValue?: UseFormSetValue<IPostForm>;
    handleSubmit?: UseFormHandleSubmit<IPostForm>;
    clearErrors?: UseFormClearErrors<IPostForm>;
  };
}
export interface IPostFormErr {}
export interface IPostType extends Post {
  host: IUserType;
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
  chosenId: [any];
  pageLink?: string;
  hashtags?: string;
  onPrivate?: boolean;
  description?: string;
  post_image?: FileList;
}

export interface IGetPosts {
  ok: boolean;
  posts: IPostType[];
}
