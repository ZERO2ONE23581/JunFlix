import { MutationRes } from './mutation';

export interface ReviewForm {
  title: string;
  movieTitle: string;
  genre: string;
  content?: string;
}
export interface CreateReviewRes extends MutationRes {}
