import { Post } from '@prisma/client';
import { Dispatch, SetStateAction } from 'react';
import { LikesWithPost, LikesWithReview } from './likes';

export interface IGetPost {
  ok: boolean;
  error?: string;
  isComments?: boolean;
  post: Post;
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
export interface IPostListProps {
  hostName?: string | null;
  isBoardPosts?: boolean;
  isAllPosts?: boolean;
  isAllMyPosts?: boolean;
  isGetLikes?: boolean;
  posts?: Post[];
  // setIsClicked: Dispatch<SetStateAction<boolean>>;
}
