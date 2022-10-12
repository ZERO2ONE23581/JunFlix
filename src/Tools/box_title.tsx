import { Svg } from './Svg';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ITheme } from '../../styles/theme';
import { Answer } from './Modal/answer_modal';
import { Flex } from '../../styles/global';

interface IBoxTitle extends ITheme {
  type: string;
  max: {
    board: {
      title: number;
      desc: number;
    };
  };
}
export const BoxTitle = ({ type, theme, max }: IBoxTitle) => {
  const [answer, setAnswer] = useState(false);
  const [text, setText] = useState({
    title: '',
    sub: { kor: '', eng: '' },
    desc: { kor: '', eng: '' },
  });

  //join
  const fillBlank = {
    kor: '(빈칸에 정보를 입력하세요.)',
    eng: 'Fill the blanks bellow.',
  };
  useEffect(() => {
    if (type === 'create-user-userId')
      setText({
        title: 'Join',
        desc: fillBlank,
        sub: { kor: '', eng: 'Step 1. USER ID' },
      });
    if (type === 'create-user-userInfo')
      setText({
        title: 'Join',
        desc: fillBlank,
        sub: { kor: '', eng: 'Step 2. USER INFO' },
      });
    if (type === 'create-user-avatar')
      setText({
        title: 'Avatar',
        sub: { kor: '', eng: 'Optional' },
        desc: { kor: '아이콘을 클릭하세요.', eng: 'Click the icon.' },
      });
  }, [setText, type]);

  //find user
  useEffect(() => {
    if (type === 'verify-email')
      setText({
        title: 'Find ID',
        desc: fillBlank,
        sub: { kor: '', eng: 'Step 1. Verify Email' },
      });
    if (type === 'verify-token-userId')
      setText({
        title: 'Find ID',
        desc: fillBlank,
        sub: { kor: '', eng: 'Step 2. Verify Token' },
      });
    if (type === 'verify-userId')
      setText({
        title: 'Find Password',
        desc: fillBlank,
        sub: { kor: '아이디 인증', eng: 'Step 1. Verify ID' },
      });
    if (type === 'verify-token-password')
      setText({
        title: 'Find Password',
        desc: fillBlank,
        sub: { kor: '', eng: 'Step 2. Verify Token' },
      });
    if (type === 'create-password')
      setText({
        title: 'New Password',
        desc: {
          eng: '',
          kor: '새로운 비밀번호를 입력하세요.',
        },
        sub: { kor: '', eng: 'Type new password.' },
      });
  }, [setText, type]);

  //update user
  useEffect(() => {
    if (type === 'update-user-userId')
      setText({
        title: 'Edit',
        desc: fillBlank,
        sub: { kor: '아이디 수정', eng: 'User ID' },
      });
    if (type === 'update-user-password')
      setText({
        title: 'Edit',
        desc: fillBlank,
        sub: { kor: '비밀번호 수정', eng: 'Password' },
      });
    if (type === 'update-user-userInfo')
      setText({
        title: 'Edit',
        desc: fillBlank,
        sub: { kor: '유저정보 수정', eng: 'User Info' },
      });
    if (type === 'update-user-avatar')
      setText({
        title: 'Edit',
        desc: fillBlank,
        sub: { kor: '아바타 수정', eng: 'Avatar' },
      });
    if (type === 'update-user-delete')
      setText({
        title: 'DANGER ZONE',
        sub: {
          eng: 'Delete Account',
          kor: '계정 삭제',
        },
        desc: { kor: '', eng: '' },
      });
  }, [setText, type]);

  //create board
  useEffect(() => {
    if (type === 'create-board')
      setText({
        title: 'Create',
        desc: fillBlank,
        sub: { kor: '영화 보드', eng: 'Movie Board' },
      });
  }, [setText, type]);

  const title = text.title;
  const sub = (type: string) => {
    if (type === 'eng') return text.sub.eng;
    if (type === 'kor') return text.sub.kor;
  };
  const desc = (type: string) => {
    if (type === 'eng') return text.desc.eng;
    if (type === 'kor') return text.desc.kor;
  };
  //
  return (
    <>
      <Cont className="box-title">
        {title && <h1>{title}</h1>}
        <Flex className="flex">
          <h2>
            {sub('eng') && <span>{sub('eng')}</span>}
            {sub('kor') && <span>{sub('kor')}</span>}
          </h2>
          <Svg
            size="2rem"
            theme={theme!}
            type="question"
            onClick={() => setAnswer(true)}
          />
        </Flex>
        <span className="desc">
          {desc('eng') && <span>{desc('eng')}</span>}
          {desc('kor') && <span>{desc('kor')}</span>}
        </span>
      </Cont>
      <Answer
        max={max}
        type={type}
        theme={theme}
        answer={answer}
        closeModal={setAnswer}
      />
    </>
  );
};
const Cont = styled(motion.div)`
  font-size: 1.5rem;
  gap: 10px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  .flex {
    justify-content: flex-start;
  }
  h1 {
    font-size: 2.5rem;
  }
  h2 {
    font-size: 1.5rem;
    .kor {
      font-size: 1.3rem;
    }
    span {
      margin-right: 10px;
    }
  }
  .desc {
    opacity: 0.8;
    font-style: italic;
    font-size: 1.3rem;
    gap: 10px;
    display: flex;
    align-items: center;
  }
`;
