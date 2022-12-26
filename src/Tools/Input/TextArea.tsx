import { useState } from 'react';
import styled from '@emotion/styled';
import { TextLength } from './TextLength';
import { ErrModal } from '../Modal/Error';
import { FlexCol, FlexCol_ } from '../../../styles/global';
import { color } from '../../../styles/variants';
import { useLength, useResponsive } from '../../libs/client/useTools';
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
  const { isDesk, isMobile } = useResponsive();
  const textLength = useLength(text!);
  const [focus, setFocus] = useState(false);
  const isRed = Boolean(focus || text);
  const height = textLength > max ? max * 0.5 : min + textLength * 0.3;
  const custom = { theme, height, isRed, disabled, isMobile };
  return (
    <AnimatePresence>
      <>
        <Cont
          isDesk={isDesk}
          height={`${height}px`}
          max={`${max * 0.48}px`}
          className="textarea-wrap"
        >
          {label && (
            <Label
              htmlFor={id}
              animate="animate"
              variants={textLabelVar}
              custom={{ ...custom }}
            >
              {label}
            </Label>
          )}
          <Style
            initial="initial"
            animate="animate"
            custom={{ ...custom }}
            variants={textareaVar}
          >
            <TextArea
              {...register}
              id={id}
              disabled={disabled}
              placeholder={placeholder}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
            />
          </Style>
          <TextLength
            theme={theme}
            isDesk={isDesk}
            number={{ max, typed: useLength(text!) }}
          />
        </Cont>
        <ErrModal _data={{ id, error, theme, clearErrors }} />
      </>
    </AnimatePresence>
  );
};
const Cont = styled(FlexCol_)<{ height: string; max: string }>`
  gap: 10px;
  width: 100%;
  position: relative;
  overflow-y: initial;
  align-items: flex-end;
  font-size: ${(p) => (p.isDesk ? '1.1rem' : '2rem')};
  label {
    top: ${(p) => (p.isDesk ? '-1rem' : '-2rem')};
    font-size: ${(p) => (p.isDesk ? '1.1rem' : '3rem')};
  }
  textarea {
    height: ${(p) => p.height};
    max-height: ${(p) => p.max};
    font-size: ${(p) => (p.isDesk ? '1.1rem' : '2.2rem')};
  }
  .text_length {
    font-size: ${(p) => (p.isDesk ? '1.1rem' : '2.5rem')};
  }
`;
const Style = styled(motion.div)`
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
`;
const TextArea = styled.textarea`
  width: 100%;
  resize: none;
  cursor: auto;
  border: none;
  outline: none;
  color: inherit;
  padding: 1.2rem;
  max-height: 500px;
  font-size: 1.1rem;
  word-break: break-all;
  background-color: inherit;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const Label = styled(motion.label)`
  left: 1rem;
  z-index: 1;
  font-size: 1.1rem;
  padding: 5px 10px;
  width: fit-content;
  position: absolute;
  border-radius: 10px;
  display: inline-block;
`;
const textareaVar = {
  initial: ({ height }: any) => ({ height }),
  animate: ({ theme, disabled, isRed, height, isMobile }: any) => ({
    height: isMobile ? '200px' : height,
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
