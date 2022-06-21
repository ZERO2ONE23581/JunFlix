import { Post } from '@prisma/client';
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
  avatar?: FileList;
}
export interface IGetAllPosts {
  ok: boolean;
  posts?: Post[];
  postlikes: LikesWithPost[];
  reviewLikes: LikesWithReview[];
}
export interface IPostListProps {
  isAllPosts?: boolean;
  isMyPosts?: boolean;
  findLikes?: boolean;
  posts?: Post[];
}
