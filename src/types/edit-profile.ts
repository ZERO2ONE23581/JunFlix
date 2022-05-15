import { User } from '@prisma/client';

export interface IProfileEditRes {
  type?: string;
  ok: boolean;
  error?: string;
}
export interface IProfileEditForm {
  fetchError?: string;
  //
  userId?: string | null;
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
  email?: string;
}
