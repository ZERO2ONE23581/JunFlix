import { Review, User } from '@prisma/client';

export interface IReviewForm {
  title: string;
  movieTitle: string;
  genre: string;
  content?: string;
}
export interface IGetMyReview {
  ok: boolean;
  foundReview?: IReviewWithUser;
}
export interface IGetAllReviews {
  ok?: true;
  allReviews?: IReviewWithUser[];
}
export interface IReviewWithUser extends Review {
  user: User;
}
