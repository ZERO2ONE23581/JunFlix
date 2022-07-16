import {
  UseFormWatch,
  UseFormSetError,
  UseFormRegister,
  UseFormSetValue,
  UseFormGetValues,
  UseFormClearErrors,
} from 'react-hook-form';
import { Dispatch, SetStateAction } from 'react';

export interface ModalProps {
  openModal: Dispatch<SetStateAction<boolean>>;
  onClick?: Dispatch<SetStateAction<boolean>>;
}
export interface IUseform {
  watch: UseFormWatch<any>;
  register: UseFormRegister<any>;
  setError: UseFormSetError<any>;
  setValue: UseFormSetValue<any>;
  getValues?: UseFormGetValues<any>;
  clearErrors: UseFormClearErrors<any>;
}
