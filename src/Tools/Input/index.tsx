import {
  color,
  GreyBorder,
  greyBrdr,
  greyColor,
  redBrdr,
  redColor,
} from '../../../styles/variants';
import { useState } from 'react';
import styled from '@emotion/styled';
import { ErrMsg } from '../error_message';
import { ITheme } from '../../../styles/theme';
import { UseFormRegisterReturn } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import { FlexCol } from '../../../styles/global';

interface IInput extends ITheme {
  id: string;
  type?: string;
  label?: string;
  watch?: string;
  isAlt?: boolean;
  disabled?: boolean;
  placeholder?: string;
  error?: string;
  register?: UseFormRegisterReturn;
}
export const InputWrap = ({
  id,
  type,
  theme,
  label,
  watch,
  error,
  disabled,
  register,
  placeholder,
}: IInput) => {
  const [focus, setFocus] = useState(false);
  const isRed = Boolean(focus || watch);
  const custom = { isRed, theme, disabled };
  return (
    <AnimatePresence initial={false}>
      <Cont className={id}>
        <FlexCol className="input_wrap_flex">
          <Style animate="animate" variants={style_var} custom={{ ...custom }}>
            <input
              id={id}
              name={id}
              type={type}
              {...register}
              disabled={disabled}
              placeholder={placeholder}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
            />
          </Style>
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
        </FlexCol>
        <ErrMsg error={error} />
      </Cont>
    </AnimatePresence>
  );
};
const Cont = styled(FlexCol)`
  gap: 20px;
  //border: 5px solid yellow;
  .input_wrap_flex {
    padding-top: 20px;
    position: relative;
    //border: 2px solid yellowgreen;
    label {
      //border: 1px solid yellow;
      top: 63%;
      left: 1rem;
      z-index: 1;
      font-size: 1.1rem;
      padding: 5px 10px;
      width: fit-content;
      position: absolute;
      border-radius: 10px;
      display: inline-block;
    }
  }
`;
const Style = styled(FlexCol)`
  width: 100%;
  padding: 10px 20px;
  border-radius: 8px;
  justify-content: center;
  input {
    width: 100%;
    border: none;
    outline: none;
    color: inherit;
    font-size: 1.2rem;
    background-color: inherit;
    ::placeholder {
      color: ${(p) => p.theme.color.grey.reg};
    }
  }
`;
const style_var = {
  animate: ({ isRed, theme, disabled }: any) => ({
    backgroundColor: color(!theme),
    color: disabled ? greyColor : color(theme),
    border: disabled ? greyBrdr : isRed ? redBrdr : GreyBorder(!theme),
  }),
};
const label_var = {
  animate: ({ isRed, theme, disabled }: any) => ({
    backgroundColor: color(!theme),
    y: disabled ? '-140%' : isRed ? '-140%' : '-50%',
    color: disabled ? greyColor : isRed ? redColor : color(theme),
  }),
};
