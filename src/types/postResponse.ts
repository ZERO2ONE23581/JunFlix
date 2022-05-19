export interface PostResponse {
  ok: boolean;
  error?: string;
  message?: string;
  [key: string]: any;
}
export interface CreateBlogResponse extends PostResponse {
  boardId: number;
  creatorId: number;
  boardTitle: string;
}
