import { Review, User } from '@prisma/client';
import { ReviewModel } from './post';

export interface IReviewList {
  isMyPage?: boolean;
  reviews: ReviewModel[];
}
export interface IReviewForm {
  title: string;
  movieTitle: string;
  genre: string;
  content?: string;
  score?: number;
  oneline?: string;
  recommend?: boolean;
  avatar?: FileList;
}
export interface IGetReview {
  ok: boolean;
  error?: string;
  review?: ReviewWithUser;
}
export interface IGetReviews {
  reviews?: ReviewWithUser[];
}
export interface ReviewWithUser extends Review {
  user: User;
  _count: {
    likes: number;
    comments: number;
  };
}
export interface IReview {
  review: ReviewWithUser;
}
export interface IReviewCmt {
  ok: boolean;
  review: Counts;
  error?: string;
  isComments?: boolean;
}
export interface IReviewLikes extends IReviewCmt {
  isLiked?: boolean;
}
interface Counts extends Review {
  _count: {
    likes: number;
    comments: number;
  };
}
