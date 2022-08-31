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
export interface IData {
  ok?: boolean;
  error?: string;
  User?: TheUser;
  isFollowing?: boolean;
  FollowingUser?: Following;
  Followers?: Following[];
  Followings?: Following[];
  MyPostLikes?: PostModel[];
  MyReviewLikes?: ReviewModel[];
  [key: string]: any;
}
interface TheUser extends User {
  posts: Post[];
  boards: Board[];
  reviews: Review[];
  following: Following[];
}
