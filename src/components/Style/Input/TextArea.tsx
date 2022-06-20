import { useState } from 'react';
import { IInputWrapProps, Label } from '.';
import { ErrorMsg } from '../ErrMsg';
import styled from '@emotion/styled';

export const TextAreaWrap = ({
  id,
  label,
  watch,
  isValue,
  register,
  disabled,
  inputErrMsg,
  placeholder,
}: IInputWrapProps) => {
  const [isFocus, setIsFocus] = useState(false);
  const handleBlur = () => {
    if (inputErrMsg) return;
    if (watch) return;
    setIsFocus(false);
  };
  const isLabelChange = Boolean(isFocus || disabled || isValue);
  return (
    <Cont>
      <div className="wrap">
        <Label htmlFor={id} isChange={isLabelChange}>
          {label}
        </Label>
        <TextArea
          {...register}
          id={id}
          name={id}
          disabled={disabled}
          onFocus={() => setIsFocus(true)}
          onBlur={handleBlur}
          placeholder={placeholder}
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
`;

const TextArea = styled.textarea`
  height: 120px;
  width: 100%;
  border: none;
  padding: 20px;
  font-size: 1.3rem;
  border-radius: 5px;
  border: ${(p) => p.theme.border};
  color: ${(p) => p.theme.color.font};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background-color: ${(p) => p.theme.color.bg};
  ::placeholder {
    font-size: 1.1rem;
    font-style: italic;
  }
  :disabled {
    background-color: inherit;
  }
  &:focus {
    border: none;
    outline: 2.5px solid ${(p) => p.theme.color.logo};
  }
`;
