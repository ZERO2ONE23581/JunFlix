import { useState } from 'react';
import { ErrorMsg } from '../ErrMsg';
import styled from '@emotion/styled';
import { User } from '@prisma/client';
import { Creator } from '../../../../Creator';
import { UseFormRegisterReturn } from 'react-hook-form';

interface ITextAreaWrap {
  id: string;
  error?: string;
  watch?: string;
  height: number;
  disabled?: boolean;
  placeholder: string;
  user?: User;
  register: UseFormRegisterReturn;
}
export const TextAreaWrap = ({
  id,
  user,
  error,
  watch,
  register,
  disabled,
  placeholder,
  height,
}: ITextAreaWrap) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <Cont className={id} isFocus={isFocus} isWatch={Boolean(watch)}>
      {user && (
        <Creator
          size="3rem"
          userAvatar={user.avatar!}
          username={user.username!}
        />
      )}
      <label htmlFor={id} style={{ display: 'none' }} />
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
const Cont = styled.article<{ isFocus: boolean; isWatch: boolean }>`
  gap: 10px;
  width: 100%;
  display: flex;
  padding: 15px 20px;
  border-radius: 3px;
  flex-direction: column;
  box-shadow: ${(p) => p.theme.boxShadow.input};
  border: ${(p) => p.isWatch && `1px solid ${p.theme.color.logo}`};
  border: ${(p) =>
    p.isFocus ? `thick double ${p.theme.color.logo}` : p.theme.border.thick};
`;
export const TextArea = styled.textarea<{
  height?: number;
}>`
  width: 100%;
  resize: none;
  outline: none;
  font-size: 1rem;
  cursor: auto;
  border: none;
  border-radius: 4px;
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
  height: ${(p) => p.height && `${p.height}px`};
  :focus {
    outline: ${(p) => `2px double ${p.theme.color.logo}`};
  }
  ::placeholder {
    font-style: italic;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;
