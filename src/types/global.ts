import { IPostType } from './post';
import { IUserType } from './user';
import { IBoardType } from './board';
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
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  original_name: string;
  backdrop_path: string;
  original_title: string;
  original_language: string;
}
export interface IMovie {
  movies: [IMovie];
}
export interface IApi {
  movies: [IMovie];
  users?: IUserType[];
  posts?: IPostType[];
  boards?: IBoardType[];
  MyPostLikes?: IPostType[];
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
  msg?: string;
  error?: string;
  noData?: boolean;
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
