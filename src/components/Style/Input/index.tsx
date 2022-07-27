import { useState } from 'react';
import styled from '@emotion/styled';
import { UseFormRegisterReturn } from 'react-hook-form';
import { Svg } from '../Svg/Svg';

export interface IInputWrapProps {
  id: string;
  type?: string;
  label?: string;
  watch?: string;
  disabled?: boolean;
  placeholder?: string;
  register?: UseFormRegisterReturn;
}
export const InputWrap = ({
  id,
  type,
  label,
  watch,
  disabled,
  register,
  placeholder,
}: IInputWrapProps) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <Cont className={id} isFocus={isFocus || Boolean(watch)}>
      <label className={id} htmlFor={id}>
        {label}
      </label>
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
    </Cont>
  );
};
const Cont = styled.article<{ isFocus: boolean }>`
  width: 100%;
  position: relative;
  label {
    left: 3%;
    border: none;
    padding: 5px 10px;
    font-size: 0.9rem;
    border-radius: 5px;
    position: absolute;
    display: inline-block;
    transform: translateY(-50%);
    background-color: ${(p) => p.theme.color.bg};
    top: ${(p) => (p.isFocus ? '-10%' : '50%')};
    font-weight: ${(p) => (p.isFocus ? 500 : 'inherit')};
    font-size: ${(p) => (p.isFocus ? '0.9rem' : '1rem')};
    color: ${(p) => (p.isFocus ? p.theme.color.logo : 'inherit')};
  }
  input {
    border: ${(p) =>
      p.isFocus ? `1px solid ${p.theme.color.logo}` : p.theme.border.thin};
  }
  input[type='date'] {
    padding: 11px;
  }
  input[type='date']::-webkit-calendar-picker-indicator {
    width: 1.3rem;
    height: 1.3rem;
    border-radius: 10%;
    background-color: white;
  }
  .birth {
    text-align: center;
    width: ${(p) => (p.isFocus ? '60px' : '100px')};
  }
`;
export const Input = styled.input`
  width: 100%;
  border: none;
  font-size: 1rem;
  padding: 10px 20px;
  border-radius: 3px;
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
  box-shadow: ${(p) => p.theme.boxShadow.input};
  :disabled {
    background-color: inherit;
  }
  &:focus {
    border: none;
    outline: thick double ${(p) => p.theme.color.logo};
  }
`;
