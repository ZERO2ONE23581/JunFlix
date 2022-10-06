import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { UseFormClearErrors } from 'react-hook-form';
import userId from '../../pages/api/user/create/userId';
import { Modal, Overlay } from '../../styles/global';
import { ITheme } from '../../styles/theme';
import { IJoinForm } from '../types/user';
import { Btn } from './Button';
import { Svg } from './Svg';

interface IErrModal extends ITheme {
  type: string;
  clearErrors: UseFormClearErrors<any>;
}
export const ErrModal = ({ type, theme, clearErrors }: IErrModal) => {
  const errVar = {
    initial: (theme: boolean) => ({
      opacity: 0,
      //color: theme ? '#000000' : '#ffffff',
      color: theme ? '#000000' : '#ffffff',
      borderColor: theme ? '#000000' : '#ffffff',
      backgroundColor: theme ? '#ffffff' : '#000000',
    }),
    animate: (theme: boolean) => ({
      opacity: 1,
      transition: {
        duration: 0.3,
      },
      color: '#ff0000',
      borderColor: '#ff0000',
      backgroundColor: theme ? '#ffffff' : '#000000',
    }),
    exit: (theme: boolean) => ({
      opacity: 0,
    }),
  };
  //
  const [error, setError] = useState({ kor: '', eng: '' });
  useEffect(() => {
    if (type === 'userId-req')
      setError({ kor: '아이디를 입력해주세요.', eng: 'Type your id please.' });
    if (type === 'userId-pattern')
      setError({
        kor: '아이디는 기호를 제외한 영문자 또는 6~20자리 숫자를 포함해야합니다.',
        eng: 'ID must include Alphabets or 6 - 20 numbers without special symbols.',
      });
  }, [type, setError]);
  //
  return (
    <AnimatePresence>
      {type && (
        <>
          <Cont
            exit="exit"
            initial="initial"
            animate="animate"
            className="loading"
            custom={theme}
            variants={errVar}
          >
            <Svg
              size="2rem"
              type="close"
              theme={theme!}
              onClick={() => clearErrors()}
            />
            <ul>
              <li>ERROR !! </li>
              <li className="err">{error.kor}</li>
              <li className="err">{error.eng}</li>
            </ul>
            <Btn
              name="OK"
              type="button"
              theme={theme}
              onClick={() => clearErrors()}
            />
          </Cont>
          <Overlay exit={{ opacity: 0 }} animate={{ opacity: 1 }} />
        </>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(Modal)`
  min-width: 400px;
  padding: 40px;
  padding-top: 50px;
  gap: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border-width: 3px;
  ul {
    li {
      font-size: 1.6rem;
      text-align: center;
      line-height: 25px;
      :nth-child(1) {
        margin-bottom: 10px;
      }
    }
    .err {
      font-size: 1.5rem;
      opacity: 0.9;
      font-style: italic;
    }
  }
  button {
    width: 80px;
    padding: 5px 10px;
    span {
      font-size: 0.6em;
    }
  }
`;
