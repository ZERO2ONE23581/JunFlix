import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ITheme } from '../../../../styles/theme';
import { Answer } from '../../../Tools/Modal/Answer';
import { Svg } from '../../../Tools/Svg';

interface IBoxTitle extends ITheme {
  type: string;
}
export const BoxTitle = ({ type, theme }: IBoxTitle) => {
  const [answer, setAnswer] = useState(false);
  const [text, setText] = useState({
    step: '',
    title: {
      kor: '',
      eng: '',
    },
    answer: '',
  });
  useEffect(() => {
    if (type === 'new-password')
      setText({
        step: 'Step 3.',
        title: {
          kor: '새로운 비밀번호를 생성합니다.',
          eng: 'Create new pasword.',
        },
        answer: 'join-userId',
      });
    if (type === 'verify_userId')
      setText({
        step: 'Step 1.',
        title: {
          kor: '아이디를 입력하여 본인임을 인증하세요.',
          eng: 'Please type your id to verify yourself.',
        },
        answer: 'join-userId',
      });
    if (type === 'email_token')
      setText({
        step: 'Step 2.',
        title: {
          kor: '이메일로 부터 받은 토큰을 입력하세요.',
          eng: 'Please type token you received from email.',
        },
        answer: 'join-userId',
      });
    if (type === 'find_userId')
      setText({
        step: 'Step 1.',
        title: {
          kor: '이메일을 입력하여 본인임을 인증하세요.',
          eng: 'Please type your email to verify yourself.',
        },
        answer: 'join-userId',
      });
    if (type === 'create-userId')
      setText({
        step: 'Step 1.',
        title: {
          kor: '빈칸에 아이디를 입력하세요.',
          eng: 'Please type your id below.',
        },
        answer: 'join-userId',
      });
    if (type === 'create-userInfo')
      setText({
        step: 'Step 2.',
        title: {
          kor: '해당란에 정보를 입력하세요.',
          eng: 'Fill the blanks below by instruction.',
        },
        answer: 'join-userInfo',
      });
    if (type === 'create-userAvatar')
      setText({
        step: '',
        title: {
          kor: '아바타를 생성하세요.',
          eng: 'Create Avatar.',
        },
        answer: 'join-userAvatar',
      });
  }, [type, setText]);
  //
  return (
    <>
      <Cont className="box-title">
        <h1>
          {type === 'new-password' && (
            <span>
              <span className="eng">New Password</span>
              <span className="kor">새로운 비밀번호</span>
            </span>
          )}
          {type === 'verify_userId' && (
            <span>
              <span className="eng">Find Password</span>
              <span className="kor">비밀번호 찾기</span>
            </span>
          )}
          {(type === 'find_userId' || type === 'email_token') && (
            <span>
              <span className="eng">Find ID</span>
              <span className="kor">아이디 찾기</span>
            </span>
          )}
          {(type === 'create-userId' || type === 'create-userInfo') && (
            <span>
              <span className="eng">Join</span>
              <span className="kor">회원가입</span>
            </span>
          )}
          {type == 'create-userAvatar' && <span>Avatar</span>}
          <Svg
            size="1em"
            theme={theme!}
            type="question"
            onClick={() => setAnswer(true)}
          />
        </h1>
        <h2>
          <span className="step">{text?.step}</span>
          <span className="wrap">
            <span className="kor">{text?.title?.kor}</span>
            <span className="eng">{text?.title?.eng}</span>
          </span>
        </h2>
      </Cont>
      <Answer
        type={type}
        theme={theme}
        isAnswer={answer}
        closeModal={setAnswer}
      />
    </>
  );
};
const Cont = styled(motion.div)`
  position: relative;
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  h1 {
    gap: 1rem;
    display: flex;
    align-items: center;
    font-size: 1em;
    font-weight: 500;
    > span {
      .eng {
        margin-right: 12px;
      }
      .kor {
        font-size: 0.7em;
      }
    }
  }
  h2 {
    font-size: 0.6em;
    font-style: italic;
    .step {
      display: block;
      font-size: 1em;
      font-weight: 500;
      margin-bottom: 10px;
    }
    .wrap {
      gap: 5px;
      display: flex;
      flex-wrap: wrap;
      align-items: flex-end;
      .kor {
        font-size: 0.9em;
      }
      .eng {
        font-size: 1em;
        margin-right: 5px;
      }
    }
  }
`;
