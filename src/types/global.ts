import { IBoardType } from './board';
import { IUserType } from './user';
import { IPostType, ReviewModel } from './post';
import { Dispatch, SetStateAction } from 'react';

export interface IForm {
  userId: string;
  title: string;
  genre?: string;
  avatar?: FileList;
  onPrivate?: boolean;
  description?: string;
  boardAvatar?: FileList;
}

export interface IMovie {
  id: number;
  title?: string;
  overview?: string;
  poster_path?: string;
  vote_average?: number;
  release_date?: string;
  original_name?: string;
  backdrop_path?: string;
  original_title?: string;
  original_language?: string;
}

export interface IApi {
  movies: [IMovie];
  users?: IUserType[];
  posts?: IPostType[];
  boards?: IBoardType[];
  MyPostLikes?: IPostType[];
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
export interface IRes {
  ok?: boolean;
  error?: string;
  msg?: string;
  [key: string]: any;
}
export interface ICreateUserRes extends IRes {
  type: string;
  userId: string;
  user_id: number;
}
export interface IModal {
  item: {
    theme: boolean;
    modal: boolean;
    onClick: (data: any) => void;
    setModal: Dispatch<SetStateAction<boolean>>;
  };
}
