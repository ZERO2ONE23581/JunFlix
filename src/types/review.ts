import { Review, User } from '@prisma/client';

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
