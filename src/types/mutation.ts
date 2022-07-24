import { PostModel } from './post';

export interface MutationRes {
  ok: boolean;
  error?: string;
  message?: string;
  post?: PostModel;
  [key: string]: any;
}

export interface CreateBoardResponse extends MutationRes {
  boardId: number;
  creatorId: number;
  boardTitle: string;
}
export interface BoardInfo {
  boardId: number;
  creatorId: number;
  boardTitle: string;
}
