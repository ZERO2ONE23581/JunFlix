import styled from '@emotion/styled';
import { UseFormRegisterReturn } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import { ITheme } from '../../../styles/theme';
import { inputErrVar, inputVar, TweenTrans } from '../../../styles/variants';
import { useState } from 'react';
import { ErrMsg } from '.';

interface ISelectWrap extends ITheme {
  id: string;
  error?: string;
  watch?: boolean;
  disabled?: boolean;
  register: UseFormRegisterReturn;
}

export const SelectWrap = ({
  id,
  error,
  theme,
  watch,
  register,
  disabled,
}: ISelectWrap) => {
  const [isFocus, setFocus] = useState(false);
  const IsFocus = Boolean(isFocus || watch || disabled);
  return (
    <AnimatePresence initial={false}>
      <>
        <label htmlFor={id} style={{ display: 'none' }} />
        <Cont
          variants={inputVar}
          exit="exit"
          initial="initial"
          animate="animate"
          whileHover={'hover'}
          whileFocus={'focus'}
          transition={TweenTrans}
          custom={{ isFocus: IsFocus, theme: !theme, isDisabled: disabled }}
          {...register}
          id={id}
          name={id}
          disabled={disabled}
          className="select-wrap"
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        >
          <>
            {id === 'gender' && (
              <>
                <option value="">Sex (성별)</option>
                <option value="male">Male (남)</option>
                <option value="female">Female (여)</option>
              </>
            )}
            {id === 'genre' && (
              <>
                <option value="">장르</option>
                <option value="sf">SF (SF)</option>
                <option value="drama">Drama (드라마)</option>
                <option value="horror">Horror (공포)</option>
                <option value="action">Action (액션)</option>
                <option value="comedy">Comedy (코미디)</option>
                <option value="romance">Romance (로맨스)</option>
                <option value="fantasy">Fantasy (판타지)</option>
                <option value="mystery">Mystery (미스터리)</option>
                <option value="thriller">Thriller (스릴러)</option>
                <option value="adventure">Adventure (모험)</option>
              </>
            )}
          </>
        </Cont>
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
      </>
    </AnimatePresence>
  );
};
const Cont = styled(motion.select)`
  font-size: 1.1rem;
  width: 100%;
  border: none;
  text-align: center;
  padding: 8px 20px;
  border-radius: 5px;
  background-color: inherit;
  box-shadow: ${(p) => p.theme.boxShadow.input};
`;
