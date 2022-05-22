import { Board, User } from '@prisma/client';

export interface BoardForm {
  title: string;
  intro: string;
  genre: string;
  avatar?: string;
  follow?: string;
}
export interface IBoardRes {
  board: BoardWithUser;
}
export interface BoardWithUser extends Board {
  user: User;
}
export interface IEditBoardForm {
  title?: string;
  intro?: string;
  genre?: string;
}
