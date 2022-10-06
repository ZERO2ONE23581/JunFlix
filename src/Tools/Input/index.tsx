import { useState } from 'react';
import styled from '@emotion/styled';
import { UseFormRegisterReturn } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import { ITheme } from '../../../styles/theme';
import { TweenTrans } from '../../../styles/variants';

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
      transition: { duration: 0.2 },
      color: !theme ? '#000000' : '#b2bec3',
      backgroundColor: theme ? '#000000' : '#ffffff',
    }),
    animate: ({ isFocus, theme }: any) => ({
      width: 'fit-content',
      transition: { duration: 0.2 },
      padding: '8px 10px',
      translateY: isFocus ? '-120%' : '-50%',
      backgroundColor: theme ? '#000000' : '#ffffff',
      color: isFocus ? '#E50914' : !theme ? '#000000' : '#b2bec3',
    }),
    exit: (isFocus: boolean) => ({
      opacity: 0,
    }),
  };
  const inputVar = {
    hover: {
      border: '3px solid #E50914',
      transition: { duration: 0.2 },
    },
    focus: {
      border: '3px solid #E50914',
      transition: { duration: 0.2 },
    },
    initial: ({ theme, isFocus }: any) => ({
      borderWeight: '1px',
      borderStyle: 'solid',
      borderColor: !theme ? 'rgba(0, 0, 0, 0)' : '#b2bec3',
      backgroundColor: theme ? '#000000' : '#ffffff',
    }),
    animate: ({ theme, isFocus }: any) => ({
      borderWeight: '1px',
      borderStyle: 'solid',
      borderColor: !theme ? 'rgba(0, 0, 0, 0)' : '#b2bec3',
      backgroundColor: theme ? '#000000' : '#ffffff',
    }),
  };
  //
  return (
    <AnimatePresence initial={false}>
      <Cont className={id}>
        {label && (
          <Label
            htmlFor={id}
            className={label}
            //
            exit="exit"
            initial="initial"
            animate="animate"
            variants={labelVar}
            custom={{ isFocus: IsFocus, theme: !theme }}
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
          transition={TweenTrans}
          custom={{ isFocus: IsFocus, theme: !theme }}
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
  height: 100%;
  position: relative;
  padding: 1.2em;
  min-height: 80px;
  //border: 3px solid yellowgreen;
`;
const Label = styled(motion.label)`
  //border: 1px solid yellow;
  top: 50%;
  left: 1em;
  z-index: 1;
  position: absolute;
  //
  font-size: 0.6em;
  width: fit-content;
  border-radius: 20px;
  display: inline-block;
  transform: translateY(-50%);
  background-color: ${(p) => p.theme.color.bg};
`;
const Input = styled(motion.input)`
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  position: absolute;
  //
  width: 100%;
  padding: 10px 20px;
  min-height: 50px;
  outline: none;
  font-size: 0.6em;
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
