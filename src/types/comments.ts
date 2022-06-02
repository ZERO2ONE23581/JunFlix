import { Comments, Post, User } from '@prisma/client';

export interface IGetPostInfo {
  ok: boolean;
  error?: string;
  isComments?: boolean;
  post: PostWithComments;
}
export interface PostWithComments extends Post {
  comments: CommentsWithUser[];
  _count: {
    comments: number;
  };
}
export interface CommentsWithUser extends Comments {
  user: User;
}
export interface IPostCommentsForm {
  comments: string;
  newComments: string;
  comment_id: string;
}
