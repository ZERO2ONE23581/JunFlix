import { useState } from 'react';
import styled from '@emotion/styled';
import { UseFormRegisterReturn } from 'react-hook-form';

interface IInputWrapProps {
  id: string;
  type?: string;
  label?: string;
  watch?: string;
  isAlt?: boolean;
  disabled?: boolean;
  placeholder?: string;
  register?: UseFormRegisterReturn;
}
export const InputWrap = ({
  id,
  type,
  isAlt,
  label,
  watch,
  disabled,
  register,
  placeholder,
}: IInputWrapProps) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <Cont className={id} isFocus={isFocus || Boolean(watch)}>
      {label && (
        <label className={id} htmlFor={id}>
          {label}
        </label>
      )}
      {!isAlt && (
        <Input
          {...register}
          id={id}
          name={id}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          isFocus={isFocus || Boolean(watch)}
        />
      )}
      {isAlt && (
        <AltInput
          {...register}
          id={id}
          name={id}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />
      )}
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
const Input = styled.input<{ isFocus: boolean }>`
  width: 100%;
  font-size: 1rem;
  padding: 10px 20px;
  border-radius: 3px;
  background-color: inherit;
  color: ${(p) => p.theme.color.font};
  box-shadow: ${(p) => p.theme.boxShadow.input};
  border: ${(p) =>
    p.isFocus ? `1px solid ${p.theme.color.logo}` : p.theme.border.thin};
  &:focus {
    border: none;
    outline: thick double ${(p) => p.theme.color.logo};
  }
`;
const AltInput = styled.input`
  width: 100%;
  border: none;
  border-radius: 0;
  box-shadow: none;
  font-size: 1.5rem;
  padding: 0 5px 5px;
  background-color: inherit;
  color: ${(p) => p.theme.color.font};
  border-bottom: 3px double ${(p) => p.theme.color.font};
  ::placeholder {
    font-size: 1.3rem;
  }
  :focus {
    outline: none;
    border-bottom: thick double ${(p) => p.theme.color.logo};
  }
`;
