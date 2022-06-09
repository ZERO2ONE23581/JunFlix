import { Likes, Post, Review } from '@prisma/client';
import { ReviewWithUser } from './review';

export interface IGetLikes {
  ok: boolean;
  error: string;
  postlikes: LikesWithPost[];
  reviewLikes: LikesWithReview[];
}

export interface LikesWithPost extends Likes {
  post: Post;
}
export interface LikesWithReview extends Likes {
  review: ReviewWithUser;
}
