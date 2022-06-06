import { UseFormRegisterReturn } from 'react-hook-form';

export interface IInputProps {
  id?: string;
  value?: string;
  type?: string;
  disabled?: boolean;
  label?: string;
  name?: string;
  errMsg?: string;
  placeholder?: string;
  options?: string[] | any;
  register?: UseFormRegisterReturn;
  max?: number;
  min?: number;
}
