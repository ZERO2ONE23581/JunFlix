import { Children, useState } from 'react';
import { ErrorMsg } from '../ErrMsg';
import styled from '@emotion/styled';
import { UseFormRegisterReturn, UseWatchProps } from 'react-hook-form';

export interface IInputWrapProps {
  id: string;
  label: string;
  type?: string;
  watch?: string;
  placeholder?: string;
  children?: any;
  isValue?: boolean;
  isSelect?: boolean;
  disabled?: boolean;
  inputErrMsg?: string;
  register: UseFormRegisterReturn;
}
export const InputWrap = ({
  id,
  type,
  label,
  watch,
  isValue,
  children,
  isSelect,
  disabled,
  register,
  inputErrMsg,
}: IInputWrapProps) => {
  const [isFocus, setIsFocus] = useState(false);
  const handleBlur = () => {
    if (inputErrMsg) return;
    if (watch) return;
    setIsFocus(false);
  };
  const isLabelChange = Boolean(
    isFocus || disabled || isValue || type === 'date'
  );
  return (
    <Cont>
      <div className="wrap">
        <InputLabel htmlFor={id} isChange={isLabelChange}>
          {label}
        </InputLabel>
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
      </div>
      {inputErrMsg && (
        <div className="error">
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
  .error {
    margin-top: 20px;
  }
  input[type='date']::-webkit-calendar-picker-indicator {
    background-color: white;
  }
`;
export const Label = styled.label<{ isChange: boolean }>`
  top: 0;
  left: 10px;
  z-index: 99;
  border: none;
  padding: 0 10px;
  font-weight: 500;
  position: absolute;
  border-radius: 5px;
  font-size: 1.3rem;
  text-align: center;
  transform: translate(10px, -50%);
  background-color: ${(p) => p.theme.color.bg};
  color: ${(p) => (p.isChange ? p.theme.color.logo : '#636e72')};
`;
export const InputLabel = styled(Label)<{ isChange: boolean }>`
  text-align: start;
  top: 50%;
  top: ${(p) => p.isChange && 0};
  font-size: ${(p) => p.isChange && '1rem'};
  text-align: ${(p) => p.isChange && 'center'};
  background-color: ${(p) => p.theme.color.bg};
`;
export const Input = styled.input<{ isDate?: boolean }>`
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
