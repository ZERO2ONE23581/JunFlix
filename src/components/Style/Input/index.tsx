import { useState } from 'react';
import { ErrorMsg } from '../ErrMsg';
import styled from '@emotion/styled';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface IInputWrapProps {
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
export const InputWrap = ({
  id,
  type,
  label,
  error,
  isValue,
  disabled,
  register,
  placeholder,
}: IInputWrapProps) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <Cont className="INPUT-WRAP" isFocus={isFocus || isValue!}>
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
  width: 100%;
  position: relative;
  label {
    left: 3%;
    position: absolute;
    transform: translateY(-50%);
    top: ${(p) => (p.isFocus ? '-10%' : '50%')};
    padding: 5px 10px;
    display: inline-block;
    border: none;
    font-size: 0.9rem;
    border-radius: 5px;
    background-color: ${(p) => p.theme.color.bg};
    font-size: ${(p) => (p.isFocus ? '0.9rem' : '1rem')};
  }
`;
export const Input = styled.input<{ isDate?: boolean }>`
  width: 100%;
  border: none;
  font-size: 1rem;
  padding: 10px 20px;
  border-radius: 3px;
  color: ${(p) => p.theme.color.font};
  border: ${(p) => p.theme.border.thick};
  background-color: ${(p) => p.theme.color.bg};
  box-shadow: ${(p) => p.theme.boxShadow.input};
  :disabled {
    background-color: inherit;
  }
  &:focus {
    border: none;
    outline: 1px solid ${(p) => p.theme.color.logo};
  }
`;
