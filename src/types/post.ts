import { Post } from '@prisma/client';

export interface IEditPostForm extends IPostForm {
  createdAt?: Date;
}
export interface IPostForm {
  title?: string;
  content?: string;
  avatar?: string;
}
export interface IPostRes {
  post: Post;
}
export interface IGetAllPosts {
  ok: boolean;
  allPosts?: Post[];
}
export interface IAllPostsProps {
  userId?: string | string[];
  boardId?: string | string[];
}
