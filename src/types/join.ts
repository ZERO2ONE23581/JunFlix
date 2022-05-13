export interface IJoinForm {
  username?: string;
  userId?: string;
  password?: string;
  confirmPw?: string;
  email?: string;
  dupUserId?: string;
}
export interface IJoinRes {
  ok?: boolean;
  error?: string;
}
