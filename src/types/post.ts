import { LikesWithPost, LikesWithReview } from './likes';
import { Board, Comment, Likes, Post, Review, User } from '@prisma/client';

export interface IPostList {
  isMyPage?: boolean;
  posts: PostModel[];
}
export interface PostModel extends Post {
  user: User;
  board: Board;
  likes: Likes[];
  comments: Comment[];
  _count: {
    likes: number;
    comments: number;
  };
}
export interface IPost {
  post: PostModel;
}
export interface IGetPost extends IPost {
  ok?: boolean;
  error?: string;
}
export interface ReviewModel extends Review {
  _count: {
    likes: number;
    comments: number;
  };
  user?: User;
  board?: Board;
}
export interface IPostForm {
  title: string;
  content?: string;
  createdAt?: Date;
  createAvatar?: FileList;
}
export interface IEditPostForm extends IPostForm {
  editAvatar?: FileList;
  createdAt?: Date;
}
export interface IGetAllPosts {
  ok: boolean;
  posts?: PostModel[];
  postlikes: LikesWithPost[];
  reviewLikes: LikesWithReview[];
}
