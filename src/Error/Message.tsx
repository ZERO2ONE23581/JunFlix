import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ITheme } from '../../styles/theme';

interface IErrMsg extends ITheme {
  error: string;
}

export const ErrMsg = ({ theme, error }: IErrMsg) => {
  const [txt, setTxt] = useState({ eng: '', kor: '' });
  useEffect(() => {
    if (error) {
      if (error === 'need_email')
        return setTxt({
          eng: 'Please type your email.',
          kor: '이메일을 입력해주세요.',
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
  return (
    <>
      {error && (
        <Cont
          exit="exit"
          initial="initial"
          animate="animate"
          className="err_msg"
          variants={errVar}
        >
          <span className="kor">{txt.kor}</span>
          <span>{txt.eng}</span>
        </Cont>
      )}
    </>
  );
};

const errVar = {
  exit: () => ({ opacity: 0, scale: 0.1 }),
  initial: () => ({ opacity: 0, scale: 0.1 }),
  animate: () => ({
    scale: 1,
    opacity: 1,
    color: '#E50914',
    transition: { duration: 0.3 },
  }),
};
const Cont = styled(motion.span)`
  font-size: 1.2rem;
  .kor {
    font-size: 1.1rem;
    margin-bottom: 0.2rem;
  }
  span {
    display: block;
    text-align: center;
    font-style: italic;
  }
`;
