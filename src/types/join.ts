export interface IJoinForm {
  username?: string;
  userId?: string;
  email?: string;
  password?: string;
  confirmPw?: string;
  dupUserId?: string;
}
export interface IJoinRes {
  ok?: boolean;
  error?: string;
}
