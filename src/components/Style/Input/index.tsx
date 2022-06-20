import { useState } from 'react';
import { ErrorMsg } from '../ErrMsg';
import styled from '@emotion/styled';
import { UseFormRegisterReturn, UseWatchProps } from 'react-hook-form';

interface IInputWrap {
  watch?: string;
  id: string;
  type: string;
  label: string;
  disabled?: boolean;
  inputErrMsg?: string;
  register: UseFormRegisterReturn;
}
export const InputWrap = ({
  watch,
  id,
  type,
  label,
  inputErrMsg,
  register,
  disabled,
}: IInputWrap) => {
  const [isFocus, setIsFocus] = useState(false);
  const handleBlur = () => {
    if (inputErrMsg) return;
    if (watch) return;
    setIsFocus(false);
  };
  return (
    <Cont>
      <div className="wrap">
        <Label disabled={disabled} isFocus={isFocus} htmlFor={id}>
          {label}
        </Label>
        <Input
          {...register}
          id={id}
          name={id}
          type={type}
          disabled={disabled}
          onFocus={() => setIsFocus(true)}
          onBlur={handleBlur}
        />
      </div>
      {inputErrMsg && (
        <div style={{ marginTop: '20px' }}>
          <ErrorMsg error={inputErrMsg} />
        </div>
      )}
    </Cont>
  );
};

const Cont = styled.article`
  width: 100%;
  .wrap {
    position: relative;
  }
`;
const Label = styled.label<{ isFocus: boolean; disabled?: boolean }>`
  position: absolute;
  z-index: 999;
  left: 10px;
  top: 50%;
  top: ${(p) => p.isFocus && 0};
  top: ${(p) => p.disabled && 0};
  transform: translate(10px, -50%);
  padding: 0 10px;
  border-radius: 5px;
  font-weight: 500;
  font-size: 1.3rem;
  font-size: ${(p) => (p.isFocus || p.disabled) && '1rem'};
  color: #636e72;
  background-color: ${(p) => p.theme.color.bg};
  color: ${(p) => (p.isFocus || p.disabled) && p.theme.color.logo};
`;
const Input = styled.input`
  width: 100%;
  border: none;
  padding: 15px 20px;
  font-size: 1.3rem;
  border-radius: 5px;
  border: ${(p) => p.theme.border};
  color: ${(p) => p.theme.color.font};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background-color: ${(p) => p.theme.color.bg};
  :disabled {
    background-color: inherit;
  }
  &:focus {
    border: none;
    outline: 2.5px solid ${(p) => p.theme.color.logo};
  }
`;
export const TextArea = styled.textarea`
  height: 100px;
  color: black;
  font-size: 1rem;
  padding: 20px;
  border-radius: 5px;
  border: ${(p) => p.theme.border};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  &::placeholder {
    font-size: 1rem;
    color: black;
    font-style: italic;
  }
  &:focus {
    outline: 3px solid ${(p) => p.theme.color.logo};
  }
`;
export const Select = styled.select`
  color: black;
  font-size: 1rem;
  padding: 12px 20px;
  border-radius: 5px;
  border: ${(p) => p.theme.border};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  &::placeholder {
    font-size: 1rem;
    color: black;
    font-style: italic;
  }
  &:focus {
    outline: 2px solid ${(p) => p.theme.color.logo};
  }
`;
