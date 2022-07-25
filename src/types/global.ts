import {
  UseFormWatch,
  UseFormSetError,
  UseFormRegister,
  UseFormSetValue,
  UseFormGetValues,
  UseFormClearErrors,
  FieldError,
} from 'react-hook-form';
import { Dispatch, SetStateAction } from 'react';

export interface IQuery {
  query: {
    userId: number;
    boardId: number;
    postId: number;
  };
}
export interface ModalProps {
  openModal: Dispatch<SetStateAction<boolean>>;
  onClick?: Dispatch<SetStateAction<boolean>>;
}
export interface IUseform {
  watch?: UseFormWatch<any>;
  register?: UseFormRegister<any>;
  setError?: UseFormSetError<any>;
  setValue?: UseFormSetValue<any>;
  getValues?: UseFormGetValues<any>;
  clearErrors?: UseFormClearErrors<any>;
  errors?: {
    title?: FieldError | undefined;
    content?: FieldError | undefined;
    oneline?: FieldError | undefined;
    movieTitle?: FieldError | undefined;
    createdAt?: FieldError | undefined;
    createAvatar?: FieldError | undefined;
  };
}
