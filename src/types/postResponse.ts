export interface PostResponse {
  ok: boolean;
  error?: string;
  message?: string;
  [key: string]: any;
}
export interface CreateBoardResponse extends PostResponse {
  boardId: number;
  creatorId: number;
  boardTitle: string;
}
export interface BoardInfo {
  boardId: number;
  creatorId: number;
  boardTitle: string;
}
