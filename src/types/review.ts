import { Review, User } from '@prisma/client';

export interface IReviewForm {
  title: string;
  movieTitle: string;
  genre: string;
  avatar?: FileList;
  content?: string;
  score?: number;
  oneline?: string;
  recommend?: boolean;
}
export interface IGetMyReview {
  ok: boolean;
  error?: string;
  foundReview?: IReviewWithUser;
}
export interface IGetAllReviews {
  ok?: true;
  allReviews?: IReviewWithUser[];
  allMyReviews?: IReviewWithUser[];
}
export interface IReviewWithUser extends Review {
  user: User;
}
