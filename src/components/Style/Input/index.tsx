import { Children, useState } from 'react';
import { ErrorMsg } from '../ErrMsg';
import styled from '@emotion/styled';
import { UseFormRegisterReturn, UseWatchProps } from 'react-hook-form';

interface IInputWrap {
  id: string;
  label: string;
  type?: string;
  watch?: string;
  children?: any;
  isValue?: boolean;
  isSelect?: boolean;
  disabled?: boolean;
  inputErrMsg?: string;
  register: UseFormRegisterReturn;
}
export const InputWrap = ({
  children,
  isSelect,
  id,
  type,
  label,
  watch,
  disabled,
  inputErrMsg,
  register,
  isValue,
}: IInputWrap) => {
  const [isFocus, setIsFocus] = useState(false);
  const handleBlur = () => {
    if (inputErrMsg) return;
    if (watch) return;
    setIsFocus(false);
  };
  const labelStyle = Boolean(id === 'birth' || id === 'gender');
  return (
    <Cont>
      <div className="wrap">
        <Label
          labelStyle={labelStyle}
          isValue={isValue}
          disabled={disabled}
          isFocus={isFocus}
          htmlFor={id}
        >
          {label}
        </Label>
        {!isSelect && !children && (
          <Input
            {...register}
            id={id}
            name={id}
            type={type}
            disabled={disabled}
            onFocus={() => setIsFocus(true)}
            onBlur={handleBlur}
          />
        )}
        {isSelect && children && (
          <Select
            as="select"
            {...register}
            id={id}
            name={id}
            disabled={disabled}
            onFocus={() => setIsFocus(true)}
            onBlur={handleBlur}
          >
            {children}
          </Select>
        )}
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
const Label = styled.label<{
  isFocus: boolean;
  labelStyle: boolean;
  isValue?: boolean;
  disabled?: boolean;
}>`
  transform: translate(10px, -50%);
  position: absolute;
  z-index: 99;
  left: 10px;
  top: 50%;
  top: ${(p) => (p.isFocus || p.disabled || p.isValue) && 0};
  //
  width: ${(p) => p.labelStyle && !p.isFocus && !p.isValue && '85%'};
  padding: 0 10px;
  padding: ${(p) => p.labelStyle && !p.isFocus && !p.isValue && '10px'};
  border: none;
  border-radius: 5px;
  font-weight: 500;
  font-size: 1.3rem;
  font-size: ${(p) => (p.isFocus || p.disabled || p.isValue) && '1rem'};
  color: #636e72;
  color: ${(p) => (p.isFocus || p.disabled || p.isValue) && p.theme.color.logo};
  background-color: ${(p) => p.theme.color.bg};
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
const Select = styled(Input)``;

const TextArea = styled.textarea`
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
