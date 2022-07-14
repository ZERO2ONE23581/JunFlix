import { useState } from 'react';
import { ErrorMsg } from '../ErrMsg';
import styled from '@emotion/styled';
import { UseFormRegisterReturn } from 'react-hook-form';
import { Input } from '.';

export interface ITitleInput {
  id: string;
  type?: string;
  label?: string;
  watch?: string;
  error?: string;
  isValue?: boolean;
  isSelect?: boolean;
  disabled?: boolean;
  placeholder?: string;
  register?: UseFormRegisterReturn;
}
export const TitleInput = ({
  id,
  type,
  label,
  error,
  isValue,
  disabled,
  register,
  placeholder,
}: ITitleInput) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <Cont isFocus={isFocus}>
      <label htmlFor={id}>{label}</label>
      <Input
        {...register}
        id={id}
        name={id}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
      {error && <ErrorMsg error={error} />}
    </Cont>
  );
};
const Cont = styled.article<{ isFocus: boolean }>`
  max-width: 330px;
  label {
    display: none;
  }
  input {
    border: none;
    padding: 3px 5px;
    box-shadow: none;
    border-radius: 0;
    font-size: 1.3rem;
    border-bottom: thick double ${(p) => p.theme.color.font};
    :focus {
      outline: none;
      border-bottom: thick double ${(p) => p.theme.color.logo};
    }
  }
`;
