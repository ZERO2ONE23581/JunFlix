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
import { ErrModal } from '../Modal/Error';
import { FlexCol, Flex_ } from '../../../styles/global';
import { UseFormClearErrors, UseFormRegisterReturn } from 'react-hook-form';
import { useResponsive } from '../../libs/client/useTools';

interface IInput {
  _data: {
    id: string;
    type: string;
    label: string;
    theme: boolean;
    error?: string;
    disabled?: boolean;
    placeholder?: string;
    text: string | number;
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
  const { isDesk } = useResponsive();
  const [focus, setFocus] = useState(false);
  const isRed = Boolean(focus || text);
  const isDate = !isRed && Boolean(type === 'date');
  const custom = { isRed, theme, disabled };
  return (
    <>
      <Cont className={id} isDate={isDate} isDesk={isDesk}>
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
const Cont = styled(Flex_)<{ isDate: boolean; isDesk: boolean }>`
  gap: 20px;
  width: 100%;
  flex-direction: column;
  .input_wrap_flex {
    position: relative;
    padding-top: ${(p) => (p.isDesk ? '3rem' : '2rem')};
    .input-style {
      padding: ${(p) => (p.isDesk ? '10px 20px' : '15px 20px ')};
    }
    input {
      font-size: ${(p) => (p.isDesk ? '1.1rem' : '3rem')};
    }
    label {
      left: 1rem;
      padding: 1px 10px;
      width: fit-content;
      position: absolute;
      border-radius: 10px;
      display: inline-block;
      width: ${(p) => p.isDate && '80%'};
      top: ${(p) => (p.isDesk ? '60%' : '60%')};
      font-size: ${(p) => (p.isDesk ? '1.1rem' : '3rem')};
    }
  }
`;
const Style = styled(FlexCol)`
  border-radius: 8px;
  justify-content: center;
  input {
    width: 100%;
    border: none;
    outline: none;
    color: inherit;
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
