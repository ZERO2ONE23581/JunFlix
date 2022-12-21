import { useState } from 'react';
import styled from '@emotion/styled';
import { TextLength } from './TextLength';
import { ErrModal } from '../Modal/Error';
import { FlexCol } from '../../../styles/global';
import { color } from '../../../styles/variants';
import { useLength } from '../../libs/client/useTools';
import { AnimatePresence, motion } from 'framer-motion';
import { InpBorderVar, InpColorVar, InpLabelColor } from '.';
import { UseFormClearErrors, UseFormRegisterReturn } from 'react-hook-form';

interface ITextAreaWrap {
  _data: {
    id: string;
    min: number;
    max: number;
    text?: string;
    theme: boolean;
    label?: string;
    error?: string;
    disabled?: boolean;
    placeholder?: string;
    register: UseFormRegisterReturn;
    clearErrors: UseFormClearErrors<any>;
  };
}
export const TextAreaWrap = ({ _data }: ITextAreaWrap) => {
  const {
    id,
    min,
    max,
    text,
    error,
    theme,
    label,
    disabled,
    register,
    placeholder,
    clearErrors,
  } = _data;
  const textLength = useLength(text!);
  const [focus, setFocus] = useState(false);
  const height = textLength > max ? max * 0.5 : min + textLength * 0.3;
  const custom = { theme, height, isRed: Boolean(focus || text), disabled };
  return (
    <AnimatePresence>
      <>
        <Cont
          height={`${height}px`}
          max={`${max * 0.48}px`}
          className="textarea-wrap"
        >
          {label && (
            <motion.label
              htmlFor={id}
              animate="animate"
              variants={textLabelVar}
              custom={{ ...custom }}
            >
              {label}
            </motion.label>
          )}
          <Style
            initial="initial"
            animate="animate"
            custom={{ ...custom }}
            variants={textareaVar}
          >
            <textarea
              {...register}
              id={id}
              disabled={disabled}
              placeholder={placeholder}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
            />
          </Style>
          <TextLength theme={theme} number={{ max, typed: useLength(text!) }} />
        </Cont>
        <ErrModal _data={{ id, error, theme, clearErrors }} />
      </>
    </AnimatePresence>
  );
};
const Cont = styled(FlexCol)<{ height: string; max: string }>`
  gap: 10px;
  width: 100%;
  overflow-y: initial;
  position: relative;
  align-items: flex-start;
  label {
    top: -1rem;
    left: 1rem;
    z-index: 1;
    font-size: 1.1rem;
    padding: 5px 10px;
    width: fit-content;
    position: absolute;
    border-radius: 10px;
    display: inline-block;
  }
  textarea {
    border: none;
    width: 100%;
    resize: none;
    cursor: auto;
    outline: none;
    max-height: 500px;
    font-size: 1.1rem;
    word-break: break-all;
    padding: 1.2rem;
    height: ${(p) => p.height};
    max-height: ${(p) => p.max};
    background-color: inherit;
    color: inherit;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;
const Style = styled(motion.div)`
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
`;
const textareaVar = {
  initial: ({ height }: any) => ({
    height,
  }),
  animate: ({ theme, disabled, isRed, height }: any) => ({
    height,
    color: InpColorVar(isRed, theme, disabled),
    border: InpBorderVar(isRed, theme, disabled),
  }),
};
const textLabelVar = {
  animate: ({ isRed, theme, disabled }: any) => ({
    backgroundColor: color(!theme),
    color: InpLabelColor(isRed, theme, disabled),
  }),
};
