import { MutationRes } from './mutation';

export interface IReviewForm {
  title: string;
  movieTitle: string;
  genre: string;
  content?: string;
}
export interface CreateReviewRes extends MutationRes {}
