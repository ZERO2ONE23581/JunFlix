import { Post } from '@prisma/client';

export interface IEditPostForm {
  title?: string;
  content?: string;
  avatar?: string;
  createdAt?: Date;
}
export interface IPostRes {
  post: Post;
}
