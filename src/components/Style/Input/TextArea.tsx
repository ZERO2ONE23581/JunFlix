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
          autoCapitalize="word"
          // maxLength={max}
          rows={10}
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
  border: none;
  padding: 20px 15px;
  padding-right: 5px;
  font-size: 1rem;
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
