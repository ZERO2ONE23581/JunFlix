import { Svg } from './Svg';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ITheme } from '../../styles/theme';
import { Answer } from './Modal/Answer';

interface IBoxTitle extends ITheme {
  type: string;
  boardMax?: {
    title: number;
    intro: number;
  };
}
export const BoxTitle = ({ type, theme, boardMax }: IBoxTitle) => {
  const [answer, setAnswer] = useState(false);
  const [text, setText] = useState({
    title: {
      kor: '',
      eng: '',
    },
    desc: {
      kor: '',
      eng: '',
      other: '',
    },
  });
  //
  useEffect(() => {
    if (type === 'edit-user5')
      setText({
        title: {
          eng: 'Danger zone',
          kor: '계정삭제',
        },
        desc: {
          other: '',
          kor: '아 계정을 삭제하려면 아이디를 입력하세요.',
          eng: 'Type your id to delete this account.',
        },
      });
    if (type === 'edit-user4')
      setText({
        title: {
          eng: 'Avatar',
          kor: '아바타 수정',
        },
        desc: {
          other: '',
          kor: '',
          eng: '',
        },
      });
    if (type === 'edit-user3')
      setText({
        title: {
          eng: 'User Info',
          kor: '회원정보 수정',
        },
        desc: {
          other: '',
          kor: '빈칸에 정보를 입력하고 업데이트 버튼을 클릭하세요.',
          eng: 'Fill the blanks below and click the "Update" button.',
        },
      });
    if (type === 'edit-user2')
      setText({
        title: {
          eng: 'Password',
          kor: '비밀번호 수정',
        },
        desc: {
          other: '',
          kor: '비밀번호 입력하고 업데이트 버튼을 클릭하세요.',
          eng: 'Type your password and click the"Update" button.',
        },
      });
    if (type === 'edit-user1')
      setText({
        title: {
          eng: 'ID',
          kor: '아이디 수정',
        },
        desc: {
          other: '',
          kor: '아이디를 입력하고 업데이트 버튼을 클릭하세요.',
          eng: 'Type your id and click the "Update" button.',
        },
      });
    if (type === 'create-board')
      setText({
        title: {
          eng: 'Create Board',
          kor: '보드 만들기',
        },
        desc: {
          other: '',
          kor: '보드에 관한 정보를 입력하세요.',
          eng: 'Fill the blanks below with your board information.',
        },
      });
    if (type === 'find-pw-step3')
      setText({
        title: {
          eng: 'New Password',
          kor: '새로운 비밀번호',
        },
        desc: {
          other: 'Step 3.',
          kor: '새로운 비밀번호를 생성합니다.',
          eng: 'Create new pasword.',
        },
      });
    if (type === 'find-pw-step1')
      setText({
        title: {
          eng: 'Find Password',
          kor: '',
        },
        desc: {
          other: 'Step 1.',
          kor: '아이디를 입력하여 본인임을 인증하세요.',
          eng: 'Type your id to verify yourself.',
        },
      });
    if (type === 'find-pw-step2')
      setText({
        title: {
          eng: 'Find Password',
          kor: '',
        },
        desc: {
          other: 'Step 2.',
          kor: '이메일로 부터 받은 토큰을 입력하세요.',
          eng: 'Type the token you received from email.',
        },
      });
    if (type === 'find-id-step2')
      setText({
        title: {
          eng: 'Find ID',
          kor: '',
        },
        desc: {
          other: 'Step 2.',
          kor: '이메일로 부터 받은 토큰을 입력하세요.',
          eng: 'Type token you received from email.',
        },
      });
    if (type === 'find-id-step1')
      setText({
        title: {
          eng: 'Find ID',
          kor: '',
        },
        desc: {
          other: 'Step 1.',
          kor: '이메일을 입력하여 본인임을 인증하세요.',
          eng: 'Type your email to verify yourself.',
        },
      });
    if (type === 'join-step1')
      setText({
        title: {
          eng: 'Join',
          kor: '',
        },
        desc: {
          other: 'Step 1.',
          kor: '빈칸에 아이디를 입력하세요.',
          eng: 'Type ID on the blank below.',
        },
      });

    if (type === 'join-step2')
      setText({
        title: {
          eng: 'Join',
          kor: '',
        },
        desc: {
          other: 'Step 2.',
          kor: '해당란에 정보를 입력하세요.',
          eng: 'Fill the blanks below by instruction.',
        },
      });
    if (type === 'join-step3')
      setText({
        title: {
          eng: '(Optional)',
          kor: '',
        },
        desc: {
          other: '',
          kor: '아바타를 생성하세요.',
          eng: 'Create Avatar.',
        },
      });
  }, [type, setText]);
  //
  return (
    <>
      <Cont className="box-title">
        <div className="title-wrap">
          <h2>
            <span className="eng">{text.title.eng}</span>
            <span className="kor">{text.title.kor}</span>
          </h2>
          <Svg
            size="1.3em"
            theme={theme!}
            type="question"
            onClick={() => setAnswer(true)}
          />
        </div>
        <div className="desc-wrap">
          <h3>{text.desc.other}</h3>
          <ul>
            <li>{text.desc.kor}</li>
            <li>{text.desc.eng}</li>
          </ul>
        </div>
      </Cont>
      <Answer
        type={type}
        theme={theme}
        answer={answer}
        boardMax={boardMax}
        closeModal={setAnswer}
      />
    </>
  );
};
const Cont = styled(motion.div)`
  font-size: 1.5rem;
  position: relative;
  gap: 20px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  .question {
    top: -3px;
    right: -50px;
    position: absolute;
  }
  .title-wrap {
    position: relative;
    gap: 20px;
    display: flex;
    align-items: center;
    width: fit-content;
    //border: 5px solid red;
    h2 {
      //border: 3px solid green;
      font-size: 2.2rem;
      gap: 12px;
      display: flex;
      align-items: flex-end;
      .kor {
        font-size: 1.5rem;
        //border: 1px solid blueviolet;
      }
    }
  }
  .desc-wrap {
    width: fit-content;
    //border: 2px solid yellow;
    display: flex;
    flex-wrap: wrap;
    h3 {
      font-size: 1.5rem;
      margin-bottom: 10px;
      //border: 3px solid yellowgreen;
    }
    ul {
      gap: 5px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      font-size: 1.3rem;
      font-style: italic;
      //border: 2px solid blue;
      li {
        //border: 2px solid blue;
        margin-bottom: 2px;
      }
    }
  }
`;
