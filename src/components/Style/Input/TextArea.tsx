import { ErrorMsg } from '../ErrMsg';
import styled from '@emotion/styled';
import { Creator } from '../../../../Creator';
import { UseFormRegisterReturn } from 'react-hook-form';
import { useState } from 'react';
import { User } from '@prisma/client';

interface ITextAreaWrap {
  id: string;
  error?: string;
  height: number;
  minHeight: number;
  maxHeight: number;
  disabled?: boolean;
  placeholder: string;
  user?: User;
  register: UseFormRegisterReturn;
}
export const TextAreaWrap = ({
  id,
  user,
  error,
  height,
  minHeight,
  maxHeight,
  register,
  disabled,
  placeholder,
}: ITextAreaWrap) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <Cont isFocus={isFocus} className="textarea-wrap">
      {user && (
        <Creator
          size="2.5rem"
          avatar={user.avatar!}
          username={user.username!}
        />
      )}
      <label htmlFor={id} />
      <TextArea
        {...register}
        id={id}
        name={id}
        disabled={disabled}
        height={height!}
        minHeight={minHeight!}
        maxHeight={maxHeight!}
        placeholder={placeholder}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
      {error && <ErrorMsg error={error} />}
    </Cont>
  );
};
const Cont = styled.article<{ isFocus: boolean }>`
  gap: 10px;
  width: 100%;
  display: flex;
  padding: 10px 20px;
  border-radius: 3px;
  flex-direction: column;
  border: ${(p) => (p.isFocus ? '2px solid red' : p.theme.border.thick)};
  label {
    display: none;
  }
`;
export const TextArea = styled.textarea<{
  height?: number;
  minHeight?: number;
  maxHeight?: number;
}>`
  width: 100%;
  resize: none;
  border: none;
  outline: none;
  font-size: 1rem;
  box-shadow: none;
  border-radius: 4px;
  color: ${(p) => p.theme.color.font};
  max-height: ${(p) => `${p.maxHeight}px`};
  background-color: ${(p) => p.theme.color.bg};
  height: ${(p) => (p.height ? `${p.height}px` : p.minHeight)};
  ::placeholder {
    font-style: italic;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;
