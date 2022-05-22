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
export interface IGetAllPosts {
  ok: boolean;
  allPosts?: Post[];
}
export interface IAllPostsProps {
  userId?: string | string[];
  boardId?: string | string[];
}
