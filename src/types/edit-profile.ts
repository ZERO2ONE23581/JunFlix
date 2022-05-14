import { User } from '@prisma/client';

export interface IProfileEditRes {
  ok: boolean;
  error?: string;
  message?: string;
  updatedUser?: User;
}
export interface IProfileEditForm {
  userId?: string | null;
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}
