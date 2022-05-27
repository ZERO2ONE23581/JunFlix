import { User } from '@prisma/client';

export interface IProfileEditRes {
  type?: string;
  ok: boolean;
  error?: string;
}
export interface IProfileEditForm {
  userId?: string | null;
  email?: string;
  //
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
  //
  avatar?: string;
  username?: string;
  name?: string;
  birth?: string;
  gender?: string;
  location?: string;
}
