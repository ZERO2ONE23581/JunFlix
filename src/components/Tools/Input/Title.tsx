import { Input } from '.';
import { useState } from 'react';
import { ErrorMsg } from '../ErrMsg';
import styled from '@emotion/styled';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface ITitleInput {
  id: string;
  type?: string;
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
  error,
  disabled,
  register,
  placeholder,
}: ITitleInput) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <Cont isFocus={isFocus} className={id}>
      <label htmlFor={id} />
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
  width: 100%;
  label {
    display: none;
  }
  input {
    padding: 0 5px;
    padding-bottom: 8px;
    box-shadow: none;
    border-radius: 0;
    font-size: 1.5rem;
    border-bottom: 2px dashed ${(p) => p.theme.color.logo};
    ::placeholder {
      font-size: 1.3rem;
    }
    :focus {
      outline: none;
      border-bottom: thick double ${(p) => p.theme.color.logo};
    }
  }
`;
