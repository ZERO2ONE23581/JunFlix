import { useState } from 'react';
import { ErrorMsg } from '../ErrMsg';
import styled from '@emotion/styled';
import { UseFormRegisterReturn, UseWatchProps } from 'react-hook-form';

export interface IInputWrapProps {
  id: string;
  label?: string;
  max?: number | any;
  min?: number | any;
  type?: string;
  watch?: string;
  placeholder?: string;
  children?: any;
  isValue?: boolean;
  isSelect?: boolean;
  disabled?: boolean;
  inputErrMsg?: string;
  register?: UseFormRegisterReturn;
}
export const InputWrap = ({
  max,
  min,
  id,
  type,
  label,
  watch,
  isValue,
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
        <Input
          {...register}
          id={id}
          name={id}
          type={type}
          maxLength={max}
          minLength={min}
          disabled={disabled}
          onFocus={() => setIsFocus(true)}
          onBlur={handleBlur}
        />
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
  left: 5px;
  z-index: 99;
  position: absolute;
  transform: translate(5px, -50%);
  border: none;
  padding: 5px 10px;
  text-align: center;
  border-radius: 5px;
  background-color: ${(p) => p.theme.color.bg};
  color: ${(p) => (p.isChange ? p.theme.color.logo : '#636e72')};
`;
export const InputLabel = styled(Label)<{ isChange: boolean }>`
  top: 50%;
  text-align: start;
  top: ${(p) => p.isChange && '-5px'};
  left: ${(p) => p.isChange && '10px'};
  font-size: ${(p) => p.isChange && '1.1rem'};
  text-align: ${(p) => p.isChange && 'center'};
  background-color: ${(p) => p.theme.color.bg};
`;
export const Input = styled.input<{ isDate?: boolean }>`
  width: 100%;
  border: none;
  font-size: 1.2rem;
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
    outline: 2.5px solid ${(p) => p.theme.color.logo};
  }
`;
