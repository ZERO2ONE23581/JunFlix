import { useState } from 'react';
import { ErrorMsg } from '../Errors';
import styled from '@emotion/styled';
import { User } from '@prisma/client';
import { Creator } from '../../../Creator';
import { UseFormRegisterReturn } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import { ErrMsg } from '.';
import {
  inputErrVar,
  inputVar,
  textAreaVar,
  TweenTrans,
} from '../../../styles/variants';
import { ITheme } from '../../../styles/theme';

interface ITextAreaWrap extends ITheme {
  id: string;
  error?: string;
  watch?: boolean;
  disabled?: boolean;
  placeholder: string;
  height?: number;
  register: UseFormRegisterReturn;
}
export const TextAreaWrap = ({
  id,
  theme,
  error,
  height,
  watch,
  register,
  disabled,
  placeholder,
}: ITextAreaWrap) => {
  const [isFocus, setIsFocus] = useState(false);
  const IsFocus = Boolean(isFocus || watch || disabled);
  //
  return (
    <AnimatePresence initial={false}>
      <>
        <label htmlFor={id} style={{ display: 'none' }} />
        <Cont
          variants={textAreaVar}
          exit="exit"
          initial="initial"
          animate="animate"
          whileHover={'hover'}
          whileFocus={'focus'}
          transition={TweenTrans}
          custom={{
            theme: !theme,
            height: height,
            isFocus: IsFocus,
            isDisabled: disabled,
          }}
          //
          height={height}
          className="textarea-wrap"
          {...register}
          id={id}
          name={id}
          disabled={disabled}
          placeholder={placeholder}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
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
      </>
    </AnimatePresence>
  );
};

export const Cont = styled(motion.textarea)<{ height?: number }>`
  padding: 20px;
  border: none;
  resize: none;
  cursor: auto;
  font-size: 1rem;
  border-radius: 4px;
  word-break: break-all;
  width: 100%;
  min-height: 150px;
  ::-webkit-scrollbar {
    display: none;
  }
`;
