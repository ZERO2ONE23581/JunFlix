import { Board } from '@prisma/client';

export interface BoardForm {
  title: string;
  intro: string;
  genre: string;
  avatar?: string;
  follow?: string;
}
export interface IBoardRes {
  board: Board;
}
export interface IEditBoardForm {
  title?: string;
  intro?: string;
  genre?: string;
}
