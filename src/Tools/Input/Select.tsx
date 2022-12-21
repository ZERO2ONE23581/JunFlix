import { useState } from 'react';
import { InpBorderVar } from '.';
import styled from '@emotion/styled';
import { ErrModal } from '../Modal/Error';
import { AnimatePresence } from 'framer-motion';
import { FlexCol } from '../../../styles/global';
import { color, greyColor, redColor } from '../../../styles/variants';
import { UseFormClearErrors, UseFormRegisterReturn } from 'react-hook-form';

interface ISelectWrap {
  _data: {
    id: string;
    text?: string;
    theme: boolean;
    error?: string;
    disabled?: boolean;
    register: UseFormRegisterReturn;
    clearErrors: UseFormClearErrors<any>;
  };
}

export const SelectWrap = ({ _data }: ISelectWrap) => {
  const { id, text, theme, error, disabled, register, clearErrors } = _data;
  const [focus, setFocus] = useState(false);
  const isRed = Boolean(focus || text);
  return (
    <AnimatePresence initial={false}>
      <>
        <label htmlFor={id} style={{ display: 'none' }} />
        <Cont
          variants={vars}
          animate="animate"
          className="select-wrap"
          custom={{ theme, disabled, isRed }}
        >
          <label htmlFor={id} style={{ display: 'none' }} />
          <select
            {...register}
            id={id}
            name={id}
            disabled={disabled}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          >
            <>
              {id === 'gender' && (
                <>
                  <option value="">Sex (성별)</option>
                  <option value="male">Male (남)</option>
                  <option value="female">Female (여)</option>
                  <option value="none">None (표시안함)</option>
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
        <ErrModal _data={{ id, theme, error, clearErrors }} />
      </>
    </AnimatePresence>
  );
};
const Cont = styled(FlexCol)`
  overflow: hidden;
  padding: 0 3rem;
  min-height: 44px;
  border-radius: 8px;
  width: fit-content;
  select {
    border: none;
    outline: none;
    color: inherit;
    padding: 11px 0;
    font-size: 1.1rem;
    width: fit-content;
    text-align: center;
    background-color: inherit;
  }
`;
const vars = {
  animate: ({ theme, disabled, isRed }: any) => ({
    transition: { duration: 0.3 },
    backgroundColor: color(!theme),
    border: InpBorderVar(isRed, theme, disabled),
    color: disabled ? greyColor : isRed ? redColor : color(theme),
    //border: disabled ? greyBrdr : isRed ? redBrdr : TransBorder(!theme),
  }),
};
