import { PostModel, ReviewModel } from './post';
import {
  UseFormWatch,
  UseFormSetError,
  UseFormRegister,
  UseFormSetValue,
  UseFormGetValues,
  UseFormClearErrors,
  FieldError,
} from 'react-hook-form';
import { Board, Following, Post, Review, User } from '@prisma/client';
import { IBoardType } from './board';
import { IUserType } from './user';

export interface IForm {
  userId: string;
  title: string;
  genre?: string;
  avatar?: FileList;
  isPrivate?: boolean;
  description?: string;
  boardAvatar?: FileList;
}

export interface IMovie {
  id: number;
  title?: string;
  overview?: string;
  vote_average?: number;
  release_date?: string;
  original_title?: string;
  original_language?: string;
  original_name?: string;
  poster_path?: string;
  backdrop_path?: string;
}

export interface IApi {
  arr?: {
    results?: [IMovie];
  };
  users?: IUserType[];
  posts?: PostModel[];
  boards?: IBoardType[];
  MyPostLikes?: PostModel[];
  MyReviewLikes?: ReviewModel[];
}

export interface IQuery {
  query: {
    userId?: number;
    boardId?: number;
    postId?: number;
    reveiwId?: number;
  };
}
export interface IUseform {
  watch?: UseFormWatch<any>;
  register?: UseFormRegister<any>;
  setError?: UseFormSetError<any>;
  setValue?: UseFormSetValue<any>;
  getValues?: UseFormGetValues<any>;
  clearErrors?: UseFormClearErrors<any>;
  errors?: {
    userId?: FieldError | undefined;
    password?: FieldError | undefined;
    newPassword?: FieldError | undefined;
    confirmPassword?: FieldError | undefined;
    email?: FieldError | undefined;
    username?: FieldError | undefined;
    name?: FieldError | undefined;
    birth?: FieldError | undefined;
    gender?: FieldError | undefined;
    location?: FieldError | undefined;
    title?: FieldError | undefined;
    content?: FieldError | undefined;
    oneline?: FieldError | undefined;
    movieTitle?: FieldError | undefined;
    createdAt?: FieldError | undefined;
    createAvatar?: FieldError | undefined;
    genre?: FieldError | undefined;
    intro?: FieldError | undefined;
    avatar?: FieldError | undefined;
  };
}
export interface IRes {
  ok?: boolean;
  error?: string;
  [key: string]: any;
}
export interface ICreateUserRes extends IRes {
  type: string;
  userId: string;
  user_id: number;
}
interface TheUser extends User {
  posts: Post[];
  boards: Board[];
  reviews: Review[];
  following: Following[];
}
