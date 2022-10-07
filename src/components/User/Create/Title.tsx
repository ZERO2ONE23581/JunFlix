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
    if (type === 'userId')
      setText({
        step: 'Step 1.',
        title: {
          kor: '빈칸에 아이디를 입력하세요.',
          eng: 'Please type your id below.',
        },
        answer: 'join-userId',
      });
    if (type === 'userInfo')
      setText({
        step: 'Step 2.',
        title: {
          kor: '해당란에 정보를 입력하세요.',
          eng: 'Fill the blanks below by instruction.',
        },
        answer: 'join-userInfo',
      });
    if (type === 'userAvatar')
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
          {type !== 'userAvatar' && (
            <span>
              <span className="eng">Join</span>
              <span className="kor">회원가입</span>
            </span>
          )}
          {type == 'userAvatar' && <span>Avatar</span>}
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
        theme={theme}
        isAnswer={answer}
        type={text?.answer}
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
