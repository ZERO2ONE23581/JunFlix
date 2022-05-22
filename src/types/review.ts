import { Review, User } from '@prisma/client';
import { MutationRes } from './mutation';

export interface IReviewForm {
  title: string;
  movieTitle: string;
  genre: string;
  content?: string;
}
export interface CreateReviewRes extends MutationRes {}
export interface IGetAllReviews {
  ok?: true;
  allReviews?: IReviewWithUser[];
}
export interface IReviewWithUser extends Review {
  user: User;
}
