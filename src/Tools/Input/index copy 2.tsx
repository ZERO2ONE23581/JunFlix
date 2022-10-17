import { useState } from 'react';
import styled from '@emotion/styled';
import { UseFormRegisterReturn } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import { ITheme } from '../../../styles/theme';
import {
  inputErrVar,
  inputVar,
  labelVar,
  TweenTrans,
} from '../../../styles/variants';

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
  const [isFocus, setFocus] = useState(false);
  const IsFocus = Boolean(isFocus || watch || disabled);
  //
  return (
    <AnimatePresence initial={false}>
      <Cont className="input-wrap">
        <Wrap className="label-input">
          {label && (
            <Label
              variants={labelVar}
              exit="exit"
              htmlFor={id}
              initial="initial"
              animate="animate"
              className={'input-label'}
              custom={{ isFocus: IsFocus, theme: !theme }}
            >
              {label}
            </Label>
          )}
          <Input
            variants={inputVar}
            exit="exit"
            initial="initial"
            animate="animate"
            whileHover={'hover'}
            whileFocus={'focus'}
            transition={TweenTrans}
            custom={{ isFocus: IsFocus, theme: !theme, disabled }}
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
        </Wrap>
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
  position: relative;
`;
const Wrap = styled.div`
  position: relative;
`;
const ErrMsg = styled(motion.div)`
  padding: 5px;
  margin: 10px 0;
  font-size: 0.6em;
  text-align: center;
`;
const Label = styled(motion.label)`
  top: 50%;
  left: 1em;
  z-index: 1;
  position: absolute;
  width: fit-content;
  border-radius: 20px;
  display: inline-block;
`;
const Input = styled(motion.input)`
  font-size: 0.6em;
  width: 100%;
  outline: none;
  padding: 10px 20px;
  border-radius: 5px;
  border-style: solid;
  background-color: inherit;
  box-shadow: ${(p) => p.theme.boxShadow.input};
  ::placeholder {
    opacity: 0.8;
    font-style: italic;
    color: ${(p) => p.theme.color.font};
  }
`;