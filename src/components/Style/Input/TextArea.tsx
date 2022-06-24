import { useState } from 'react';
import { IInputWrapProps, Label } from '.';
import { ErrorMsg } from '../ErrMsg';
import styled from '@emotion/styled';

export const TextAreaWrap = ({
  max,
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
          autoCapitalize="word"
          onBlur={handleBlur}
          placeholder={placeholder}
          onFocus={() => setIsFocus(true)}
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
    label {
      font-size: 1.1rem;
      padding: 8px 10px;
      border-radius: 20%;
      padding-bottom: 4px;
      transform: translate(10px, -70%);
    }
  }
  .error {
    margin-top: 20px;
  }
`;

const TextArea = styled.textarea`
  resize: none;
  width: 100%;
  font-size: 1rem;
  padding: 18px 15px;
  border-radius: 4px;
  color: ${(p) => p.theme.color.font};
  border: ${(p) => p.theme.border.bold};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background-color: ${(p) => p.theme.color.bg};
  ::placeholder {
    font-size: 1rem;
    font-style: italic;
  }
  :disabled {
    background-color: inherit;
  }
  &:focus {
    border: none;
    outline: 2.5px solid ${(p) => p.theme.color.logo};
  }
  ::-webkit-scrollbar {
    background-color: #0d0d0d;
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${(p) => p.theme.color.logo};
    background-color: #c0392b;
    opacity: 0.5;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px black;
  }
  ::-webkit-scrollbar-track {
    border-radius: 10px;
    box-shadow: inset 0px 0px 1px white;
  }
`;
