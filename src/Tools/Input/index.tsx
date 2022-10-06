import { useState } from 'react';
import styled from '@emotion/styled';
import { UseFormRegisterReturn } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import { SpringTrans, TweenTrans } from '../../../styles/variants';
import { ITheme } from '../../../styles/theme';

interface IInput extends ITheme {
  id: string;
  type?: string;
  label?: string;
  watch?: string;
  isAlt?: boolean;
  disabled?: boolean;
  placeholder?: string;
  register?: UseFormRegisterReturn;
}
export const InputWrap = ({
  id,
  type,
  theme,
  label,
  watch,
  disabled,
  register,
  placeholder,
}: IInput) => {
  //
  const [isFocus, setFocus] = useState(false);
  const IsFocus = Boolean(isFocus || watch);

  const labelVar = {
    initial: ({ isFocus, theme }: any) => ({
      opacity: 1,
      translateY: '-50%',
      color: theme ? '#000000' : '#ffffff',
      transition: { duration: 0.2 },
    }),
    animate: ({ isFocus, theme }: any) => ({
      //opacity: isFocus ? 1 : 0,
      padding: '0.7em',
      width: 'fit-content',
      transition: { duration: 0.2 },
      translateY: isFocus ? '-120%' : '-50%',
      color: isFocus ? '#E50914' : theme ? '#000000' : '#ffffff',
    }),
    exit: (isFocus: boolean) => ({
      opacity: 0,
    }),
  };
  const inputVar = {
    hover: {
      border: '1px solid transparent',
      outline: '3px solid #E50914',
      transition: { duration: 0.2 },
    },
    focus: {
      outline: '3px solid #E50914',
      transition: { duration: 0.2 },
    },
    initial: ({ theme, isFocus }: any) => ({
      outline: '3px solid transparent',
    }),
    animate: ({ theme, isFocus }: any) => ({
      outline: isFocus ? '3px solid #E50914' : '3px solid transparent',
      border: isFocus
        ? '1px solid transparent'
        : theme
        ? '1px solid #000000'
        : '1px solid #ffffff',
    }),
  };
  //
  return (
    <AnimatePresence>
      <Cont className={id}>
        {label && (
          <Label
            htmlFor={id}
            className={label}
            //
            exit="exit"
            initial="initial"
            animate="animate"
            custom={{ isFocus: IsFocus, theme: theme }}
            variants={labelVar}
          >
            {label}
          </Label>
        )}
        <Input
          exit="exit"
          initial="initial"
          animate="animate"
          whileHover={'hover'}
          whileFocus={'focus'}
          variants={inputVar}
          custom={{ isFocus: IsFocus, theme: theme }}
          //
          {...register}
          id={id}
          name={id}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
      </Cont>
    </AnimatePresence>
  );
};
const Cont = styled.article`
  width: 100%;
  position: relative;
`;
const Label = styled(motion.label)`
  //border: 1px solid yellow;
  top: 50%;
  left: 1em;
  z-index: 1;
  position: absolute;
  //
  width: 80%;
  padding: 0.7em 1em;
  font-size: 0.7em;
  border-radius: 20px;
  display: inline-block;
  transform: translateY(-50%);
  background-color: ${(p) => p.theme.color.bg};
`;
const Input = styled(motion.input)`
  width: 100%;
  outline: none;
  font-size: 0.8em;
  padding: 0.7em 1em;
  border-radius: 5px;
  border-style: solid;
  background-color: inherit;
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
  box-shadow: ${(p) => p.theme.boxShadow.input};
  ::placeholder {
    opacity: 0.8;
    font-style: italic;
    color: ${(p) => p.theme.color.font};
  }
`;
const AltInput = styled.input`
  width: 100%;
  border: none;
  border-radius: 0;
  box-shadow: none;
  font-size: 1.5rem;
  padding: 0 5px 5px;
  background-color: inherit;
  color: ${(p) => p.theme.color.font};
  border-bottom: 3px double ${(p) => p.theme.color.font};
  ::placeholder {
    font-size: 1.3rem;
  }
  :focus {
    outline: none;
    border-bottom: thick double ${(p) => p.theme.color.logo};
  }
`;
