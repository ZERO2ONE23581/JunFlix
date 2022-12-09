import styled from '@emotion/styled';
import { OverlayBg } from '../overlay';
import { useEffect, useState } from 'react';
import { Modal } from '../../../styles/global';
import { AnimatePresence } from 'framer-motion';
import { UseFormClearErrors } from 'react-hook-form';
import { color, redColor } from '../../../styles/variants';

interface IErrMsg {
  _data: {
    id: string;
    theme: boolean;
    error?: string;
    clearErrors: UseFormClearErrors<any>;
  };
}
export const ErrModal = ({ _data }: IErrMsg) => {
  const { id, theme, error, clearErrors } = _data;
  const [txt, setTxt] = useState({ eng: '', kor: '' });

  useEffect(() => {
    if (error) {
      if (error === 'need_userInfo')
        return setTxt({
          eng: 'You need type at least one for the update.',
          kor: '수정을 위해 최소 한개의 유저정보를 입력해주세요.',
        });
      if (error === 'need_email')
        return setTxt({
          eng: 'Please type your email.',
          kor: '이메일을 입력해주세요.',
        });
      if (error === 'need_comment')
        return setTxt({
          eng: 'Please type your Comment.',
          kor: '댓글을 입력해주세요.',
        });
      if (error === 'overmax_comment')
        return setTxt({
          eng: `Comment can not exeed more than 700 letters.`,
          kor: '댓글은 700자를 초과할 수 없습니다.',
        });
      if (error === 'invalid_email')
        return setTxt({
          eng: 'Please type valid email form.',
          kor: '올바른 이메일 형식을 입력해주세요.',
        });
      //
      if (error === 'need_password')
        return setTxt({
          eng: 'Please type your password.',
          kor: '비빌번호를 입력해주세요.',
        });
      if (error === 'need_password_confirm')
        return setTxt({
          eng: 'Please type your password confirm.',
          kor: '확인 비빌번호를 입력해주세요.',
        });
      if (error === 'invalid_password_confirm')
        return setTxt({
          eng: `Password doesn't match. Please re-type your passwords.`,
          kor: `비밀번호가 일치하지 않습니다. 비밀번호를 다시 확인해 주세요.`,
        });
      if (error === 'min_password')
        return setTxt({
          eng: 'Password must be more than 8 letters.',
          kor: '비밀번호는 최소 8자리 이상이어야 합니다.',
        });
      if (error === 'min_password')
        return setTxt({
          eng: 'Password must be less than 16 letters.',
          kor: '비밀번호는 16자리 초과할 수 없습니다.',
        });
      if (error === 'invalid_password')
        return setTxt({
          eng: 'Password must include at least 1 letter, number, special charactor.',
          kor: '비밀번호는 최소 1개이상의 숫자, 문자, 정의된 특수문자를 포함해야 합니다.',
        });
    }
  }, [error, setTxt]);
  const closeModal = () => clearErrors(id);

  return (
    <AnimatePresence>
      {error && (
        <>
          <Cont
            exit="exit"
            custom={theme}
            initial="initial"
            animate="animate"
            className="err-modal"
            variants={errModalVar}
          >
            <span className="txt">
              {txt.kor && <span className="kor">{txt.kor}</span>}
              {txt.eng && <span>{txt.eng}</span>}
            </span>
          </Cont>
          <OverlayBg dark={0.8} zIndex={221} closeModal={closeModal} />
        </>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(Modal)`
  z-index: 222;
  height: 200px;
  min-height: 150px;
  margin-top: 20rem;
  font-size: 1.3rem;
  width: fit-content;
  height: fit-content;
  .txt {
    text-align: center;
    span {
      display: block;
      font-size: 1.6rem;
    }
    .kor {
      font-size: 1.5rem;
    }
  }
`;
const errModalVar = {
  initial: (theme: boolean) => ({
    scale: 0.1,
    opacity: 0,
  }),
  animate: (theme: boolean) => ({
    scale: 1,
    opacity: 1,
    color: redColor,
    transition: { duration: 0.3 },
    backgroundColor: color(!theme),
  }),
  exit: (theme: boolean) => ({
    scale: 0.1,
    opacity: 0,
    transition: { duration: 0.3 },
  }),
};
