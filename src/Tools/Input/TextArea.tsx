import { ErrMsg } from '.';
import { useState } from 'react';
import styled from '@emotion/styled';
import { ITheme } from '../../../styles/theme';
import { UseFormRegisterReturn } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import { inputErrVar, textAreaVar, TweenTrans } from '../../../styles/variants';

interface ITextAreaWrap extends ITheme {
  id: string;
  error?: string;
  height?: string;
  watch?: boolean;
  disabled?: boolean;
  placeholder?: string;
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
  const custom = {
    theme: !theme,
    height,
    isFocus: IsFocus,
    isDisabled: disabled,
  };
  //
  return (
    <AnimatePresence initial={false}>
      <Cont className="textarea-wrap">
        <label htmlFor={id} style={{ display: 'none' }} />
        <motion.textarea
          variants={textAreaVar}
          exit="exit"
          initial="initial"
          animate="animate"
          whileHover={'hover'}
          whileFocus={'focus'}
          transition={TweenTrans}
          custom={custom}
          //
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
      </Cont>
    </AnimatePresence>
  );
};
const Cont = styled.div`
  gap: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  textarea {
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
  }
`;
