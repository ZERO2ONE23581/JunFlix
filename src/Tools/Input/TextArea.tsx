import { ErrMsg } from '.';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { ITheme } from '../../../styles/theme';
import { UseFormRegisterReturn } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import { inputErrVar, TweenTrans } from '../../../styles/variants';
import { useHeight, useLength } from '../../libs/client/useTools';
import { TextLength } from '../TextLength';

interface ITextAreaWrap extends ITheme {
  id: string;
  error?: string;
  watch?: string;
  disabled?: boolean;
  placeholder?: string;
  startHeight: number;
  length: {
    max: number;
    typed?: string;
  };
  register: UseFormRegisterReturn;
}
export const TextAreaWrap = ({
  id,
  theme,
  error,
  length,
  watch,
  register,
  disabled,
  placeholder,
  startHeight,
}: ITextAreaWrap) => {
  const { Height } = useHeight(watch!, startHeight);
  const height = Height ? Height : startHeight;
  const [isFocus, setIsFocus] = useState(false);
  const IsFocus = Boolean(isFocus || watch || disabled);
  const custom = {
    height,
    IsFocus,
    disabled,
    theme: !theme,
  };
  //
  return (
    <AnimatePresence initial={false}>
      <Cont className="textarea-wrap" minHeight={`${startHeight}px`}>
        <label htmlFor={id} style={{ display: 'none' }} />
        <motion.textarea
          {...register}
          id={id}
          name={id}
          disabled={disabled}
          placeholder={placeholder}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          custom={custom}
          variants={textAreaVar}
          transition={TweenTrans}
          exit="exit"
          initial="initial"
          animate="animate"
          whileHover={'hover'}
          whileFocus={'focus'}
          //
        />
        <TextLength
          theme={theme}
          number={{
            max: length?.max!,
            typed: useLength(length?.typed!),
          }}
        />
        {error && (
          <ErrMsg
            exit="exit"
            initial="initial"
            animate="animate"
            custom={theme}
            variants={inputErrVar}
            className="err-msg"
          >
            {error}
          </ErrMsg>
        )}
      </Cont>
    </AnimatePresence>
  );
};
const Cont = styled.div<{ minHeight: string }>`
  gap: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  textarea {
    font-size: 1.2rem;
    padding: 10px;
    padding-left: 15px;
    padding-top: 15px;
    border: none;
    resize: none;
    cursor: auto;
    border-radius: 4px;
    word-break: break-all;
    width: 100%;
    min-height: 150px;
    min-height: ${(p) => p.minHeight && p.minHeight};
    ::placeholder {
    }
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;
const textAreaVar = {
  initial: ({ theme, IsFocus, disabled, height }: any) => ({
    height,
    color: disabled ? '#E50914' : theme ? '#ffffff' : '#000000',
    backgroundColor: !theme ? '#ffffff' : '#000000',
    outline: IsFocus
      ? '3px solid #E50914 '
      : disabled
      ? '3px solid #636e72'
      : theme
      ? '1px solid #ffffff'
      : '1px solid #000000',
  }),
  animate: ({ theme, IsFocus, disabled, height }: any) => ({
    height,
    color: disabled ? '#636e72' : theme ? '#ffffff' : '#000000',
    backgroundColor: !theme ? '#ffffff' : '#000000',
    outline: IsFocus
      ? '3px solid #E50914 '
      : disabled
      ? '3px solid #636e72'
      : theme
      ? '1px solid #ffffff'
      : '1px solid #000000',
  }),
  hover: ({ disabled }: any) => ({
    transition: { duration: 0.2 },
    outline: !disabled ? '3px solid rgb(229,9,20)' : '3px solid #636e72',
  }),
  focus: ({ disabled }: any) => ({
    transition: { duration: 0.2 },
    outline: !disabled ? '3px solid rgb(229,9,20)' : '3px solid #636e72',
  }),
};
