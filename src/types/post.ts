import { Post } from '@prisma/client';

export interface IEditPostForm extends IPostForm {
  createdAt?: Date;
}
export interface IPostForm {
  title?: string;
  content?: string;
  avatar?: FileList;
}
export interface IPostRes {
  ok: boolean;
  post: Post;
}
export interface IGetAllPosts {
  ok: boolean;
  posts?: Post[];
}
export interface IPostListProps {
  allPosts?: boolean;
  myPosts?: boolean;
  posts?: Post[];
}
