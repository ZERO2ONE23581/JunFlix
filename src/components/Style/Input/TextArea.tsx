import { IInputWrapProps } from '.';
import { ErrorMsg } from '../ErrMsg';
import styled from '@emotion/styled';

export const TextAreaWrap = ({
  id,
  register,
  disabled,
  inputErrMsg,
  placeholder,
}: IInputWrapProps) => {
  return (
    <Cont>
      <label htmlFor={id} />
      <TextArea
        {...register}
        id={id}
        name={id}
        rows={4}
        disabled={disabled}
        autoCapitalize="sentences"
        placeholder={placeholder}
      />
      {inputErrMsg && <ErrorMsg error={inputErrMsg} />}
    </Cont>
  );
};
const Cont = styled.article`
  gap: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  label {
    display: none;
  }
`;
export const TextArea = styled.textarea`
  width: 100%;
  resize: none;
  padding: 0;
  border: none;
  outline: none;
  font-size: 1rem;
  box-shadow: none;
  border-radius: 4px;
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
  ::placeholder {
    font-size: 1rem;
    font-style: italic;
  }
  :disabled {
    background-color: inherit;
  }
  :focus {
    border: none;
    outline: none;
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
