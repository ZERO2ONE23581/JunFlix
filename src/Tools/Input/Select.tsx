import styled from '@emotion/styled';
import { UseFormRegisterReturn } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import { ITheme } from '../../../styles/theme';
import { useState } from 'react';
import { ErrMsg } from '../error_message';
import { FlexCol } from '../../../styles/global';
import {
  color,
  greyBrdr,
  greyColor,
  redBrdr,
  redColor,
  TransBorder,
} from '../../../styles/variants';

interface ISelectWrap {
  _data: {
    id: string;
    text?: string;
    theme: boolean;
    error?: string;
    disabled?: boolean;
    register: UseFormRegisterReturn;
  };
}

export const SelectWrap = ({ _data }: ISelectWrap) => {
  const id = _data?.id!;
  const text = _data?.text!;
  const error = _data?.error!;
  const theme = _data?.theme!;
  const register = _data?.register!;
  const disabled = _data?.disabled!;
  const [focus, setFocus] = useState(false);
  const isRed = Boolean(focus || text);
  return (
    <AnimatePresence initial={false}>
      <>
        <label htmlFor={id} style={{ display: 'none' }} />
        <Cont
          custom={{ theme, disabled, isRed }}
          variants={select_vars}
          animate="animate"
        >
          <label htmlFor={id} />
          <select
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
          </select>
        </Cont>
        <ErrMsg error={error} />
      </>
    </AnimatePresence>
  );
};
const select_vars = {
  animate: ({ theme, disabled, isRed }: any) => ({
    transition: { duration: 0.3 },
    backgroundColor: color(!theme),
    color: disabled ? greyColor : isRed ? redColor : color(theme),
    border: disabled ? greyBrdr : isRed ? redBrdr : TransBorder(!theme),
  }),
};
const Cont = styled(FlexCol)`
  label {
    display: none;
    padding: 8px 20px;
    border-radius: 5px;
  }
  select {
    width: 100%;
    border: none;
    font-size: 1.1rem;
    text-align: center;
    background-color: inherit;
    box-shadow: ${(p) => p.theme.boxShadow.input};
  }
`;
