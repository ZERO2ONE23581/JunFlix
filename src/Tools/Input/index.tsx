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
import { motion } from 'framer-motion';
import { ErrModal } from '../err_modal';
import { FlexCol } from '../../../styles/global';
import { UseFormClearErrors, UseFormRegisterReturn } from 'react-hook-form';

interface IInput {
  _data: {
    id: string;
    type: string;
    text: string;
    label: string;
    theme: boolean;
    error?: string;
    disabled?: boolean;
    placeholder?: string;
    register: UseFormRegisterReturn;
    clearErrors: UseFormClearErrors<any>;
  };
}
export const InputWrap = ({ _data }: IInput) => {
  const {
    id,
    text,
    type,
    error,
    theme,
    label,
    register,
    disabled,
    placeholder,
    clearErrors,
  } = _data;
  const [focus, setFocus] = useState(false);
  const custom = { isRed: Boolean(focus || text), theme, disabled };
  return (
    <>
      <Cont className={id}>
        <FlexCol className="input_wrap_flex">
          <Style
            className="input-style"
            animate="animate"
            variants={InputVar}
            custom={{ ...custom }}
          >
            <input
              {...register}
              id={id}
              name={id}
              type={type}
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
              variants={InplabelVar}
              custom={{ ...custom }}
            >
              {label}
            </motion.label>
          )}
        </FlexCol>
      </Cont>
      <ErrModal _data={{ id, theme, error, clearErrors }} />
    </>
  );
};
const Cont = styled(FlexCol)`
  gap: 20px;
  //border: 5px solid yellow;
  .input_wrap_flex {
    padding-top: 1rem;
    position: relative;
    //border: 5px solid blue;
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
const InputVar = {
  animate: ({ isRed, theme, disabled }: any) => ({
    color: InpColorVar(isRed, theme, disabled),
    border: InpBorderVar(isRed, theme, disabled),
  }),
};
const InplabelVar = {
  animate: ({ isRed, theme, disabled }: any) => ({
    y: InpLabelY(isRed, disabled),
    backgroundColor: color(!theme),
    color: InpLabelColor(isRed, theme, disabled),
  }),
};
export const InpBorderVar = (
  isRed: boolean,
  theme: boolean,
  disabled: boolean
) => (disabled ? greyBrdr : isRed ? redBrdr : GreyBorder(!theme));

export const InpColorVar = (
  isRed: boolean,
  theme: boolean,
  disabled: boolean
) => (disabled ? greyColor : color(theme));

export const InpLabelColor = (
  isRed: boolean,
  theme: boolean,
  disabled: boolean
) => (disabled ? greyColor : isRed ? redColor : color(theme));

export const InpLabelY = (isRed: boolean, disabled: boolean) =>
  disabled ? '-140%' : isRed ? '-140%' : '-50%';
