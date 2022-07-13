import { ErrorMsg } from '../ErrMsg';
import styled from '@emotion/styled';
import { Creator } from '../../../../Creator';
import useUser from '../../../libs/client/useUser';
import { UseFormRegisterReturn } from 'react-hook-form';
import { useState } from 'react';

interface ITextAreaWrap {
  id: string;
  error?: string;
  height?: number;
  disabled?: boolean;
  placeholder: string;
  register: UseFormRegisterReturn;
}
export const TextAreaWrap = ({
  id,
  error,
  height,
  register,
  disabled,
  placeholder,
}: ITextAreaWrap) => {
  const { loggedInUser } = useUser();
  const [isFocus, setIsFocus] = useState(false);
  return (
    <Cont isFocus={isFocus}>
      <Creator
        size="2.5rem"
        avatar={loggedInUser?.avatar!}
        username={loggedInUser?.username!}
      />
      <label htmlFor={id} />
      <TextArea
        {...register}
        id={id}
        name={id}
        height={height!}
        disabled={disabled}
        placeholder={placeholder}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
      {error && <ErrorMsg error={error} />}
    </Cont>
  );
};
const Cont = styled.article<{ isFocus: boolean }>`
  width: 100%;
  border-radius: 3px;
  padding: 10px 20px;
  gap: 10px;
  display: flex;
  flex-direction: column;
  border: ${(p) => (p.isFocus ? '2px solid red' : p.theme.border.thick)};
  label {
    display: none;
  }
`;
export const TextArea = styled.textarea<{ height?: number }>`
  width: 100%;
  max-height: 400px;
  height: ${(p) => (p.height ? `${p.height}px` : '150px')};
  resize: none;
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
  ::-webkit-scrollbar {
    display: none;
  }
`;
