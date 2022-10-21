import {
  color,
  greyBrdr,
  greyColor,
  redBrdr,
  redColor,
  TransBorder,
} from '../../../styles/variants';
import { useState } from 'react';
import styled from '@emotion/styled';
import { ErrMsg } from '../error_message';
import { TextLength } from '../TextLength';
import { ITheme } from '../../../styles/theme';
import { FlexCol } from '../../../styles/global';
import { useLength } from '../../libs/client/useTools';
import { AnimatePresence, motion } from 'framer-motion';
import { UseFormRegisterReturn } from 'react-hook-form';

interface ITextAreaWrap extends ITheme {
  id: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  register: UseFormRegisterReturn;
  data: {
    min: number;
    max: number;
    text?: string;
    error?: string;
  };
}
export const TextAreaWrap = ({
  id,
  data,
  label,
  theme,
  register,
  disabled,
  placeholder,
}: ITextAreaWrap) => {
  //const disabled = true;
  const min = data?.min!;
  const max = data?.max!;
  const text = data?.text!;
  const error = data?.error!;
  const textLength = useLength(text!);
  const [focus, setFocus] = useState(false);
  const isRed = Boolean(focus || text);
  const height = textLength > max ? max * 0.5 : min + textLength * 0.3;
  const custom = { theme, height, isRed, disabled };
  return (
    <AnimatePresence>
      <Cont
        height={`${height}px`}
        max={`${max * 0.48}px`}
        className="textarea-wrap"
      >
        {label && (
          <motion.label
            htmlFor={id}
            animate="animate"
            variants={label_var}
            custom={{ ...custom }}
          >
            {label}
          </motion.label>
        )}
        <Style
          initial="initial"
          animate="animate"
          custom={{ ...custom }}
          variants={textarea_vars}
        >
          <textarea
            id={id}
            {...register}
            disabled={disabled}
            placeholder={placeholder}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
        </Style>
        <TextLength theme={theme} number={{ max, typed: useLength(text!) }} />
        <ErrMsg error={error} />
      </Cont>
    </AnimatePresence>
  );
};
const Cont = styled(FlexCol)<{ height: string; max: string }>`
  gap: 10px;
  width: 100%;
  overflow-y: initial;
  align-items: flex-start;
  position: relative;
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
    //border: 1px solid yellow;
  }
  textarea {
    width: 100%;
    resize: none;
    cursor: auto;
    border: none;
    //border: 1px solid yellow;
    outline: none;
    max-height: 500px;
    font-size: 1.1rem;
    word-break: break-all;
    height: ${(p) => p.height};
    max-height: ${(p) => p.max};
    color: ${(p) => p.theme.color.font};
    background-color: ${(p) => p.theme.color.bg};
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;
const Style = styled(motion.div)`
  width: 100%;
  overflow: hidden;
  padding: 15px 20px;
  border-radius: 8px;
`;

const textarea_vars = {
  initial: ({ height }: any) => ({
    height,
  }),
  animate: ({ theme, disabled, isRed, height }: any) => ({
    height,
    transition: { duration: 0.3 },
    backgroundColor: color(!theme),
    color: disabled ? greyColor : isRed ? redColor : color(theme),
    border: disabled ? greyBrdr : isRed ? redBrdr : TransBorder(!theme),
  }),
};
const label_var = {
  animate: ({ isRed, theme, disabled }: any) => ({
    backgroundColor: color(!theme),
    color: disabled ? greyColor : isRed ? redColor : color(theme),
  }),
};
