import {
  FieldError,
  UseFormReset,
  UseFormWatch,
  UseFormSetValue,
  UseFormSetError,
  UseFormRegister,
  UseFormClearErrors,
  UseFormHandleSubmit,
} from 'react-hook-form';
import { IRes } from './global';
import { IUserType } from './user';
import { IBoardType } from './board';
import { Comment, Like, Post } from '@prisma/client';

export interface IGetPostType {
  post: IPostType;
}
export interface IPostType extends Post {
  likes: Like[];
  host: IUserType;
  board: IBoardType;
  comments: Comment[];
  _count: {
    likes: number;
    comments: number;
  };
}
export interface ICreatePostRes extends IRes {
  post_id: number;
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
    clearErrors?: UseFormClearErrors<IPostForm>;
    handleSubmit?: UseFormHandleSubmit<IPostForm>;
  };
}
