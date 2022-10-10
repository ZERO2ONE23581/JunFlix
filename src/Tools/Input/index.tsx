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
  label: string;
  watch?: boolean;
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
  const isFocus = Boolean(focus || watch || disabled);
  //
  return (
    <AnimatePresence initial={false}>
      <Cont className="input-wrap">
        <div className="label-input">
          {label && (
            <Label
              variants={labelVar}
              exit="exit"
              htmlFor={id}
              initial="initial"
              animate="animate"
              className={'input-label'}
              custom={{
                id,
                isFocus,
                disabled,
                theme: !theme,
              }}
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
            custom={{ isFocus, theme: !theme, disabled }}
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
        </div>
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
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  width: 100%;
  .label-input {
    width: 100%;
    position: relative;
    label {
      width: fit-content;
    }
    input {
      width: 100%;
    }
  }
`;
const Label = styled(motion.label)`
  top: 50%;
  left: 1rem;
  z-index: 1;
  font-size: 1rem;
  position: absolute;
  border-radius: 20px;
  display: inline-block;
`;
export const ErrMsg = styled(motion.div)`
  padding: 5px;
  font-size: 1em;
  text-align: center;
`;
export const Input = styled(motion.input)`
  border: none;
  font-size: 1.1rem;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: inherit;
  box-shadow: ${(p) => p.theme.boxShadow.input};
  ::placeholder {
    opacity: 0.8;
    font-style: italic;
    color: ${(p) => p.theme.color.font};
  }
`;
