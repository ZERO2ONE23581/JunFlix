export interface IJoinForm {
  username?: string;
  userId?: string;
  email?: string;
  password?: string;
  confirmPw?: string;
  userIdCheckErr?: string;
}
export interface IJoinRes {
  ok?: boolean;
  error?: string;
}
