import { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Page } from '../../../../../styles/global';
import { Title } from '../../../../../src/components/Layout/Title';
import { CreateBoard } from '../../../../../src/components/Board/Create';
import { IconBtn } from '../../../../../src/components/Style/Button/IconBtn';

const Create_Board: NextPage = () => {
  const [preview, setPreview] = useState('');
  const [answer, setAnswer] = useState(false);
  return (
    <>
      <Title title="보드생성" />
      <Cont>
        <Background bg={preview}>
          <CreateBoard
            isPreivew={Boolean(preview)}
            answer={answer}
            setAnswer={setAnswer}
            setPreview={setPreview}
          />
        </Background>
        <IconBtn
          size="3rem"
          type="button"
          svgType="question"
          onClick={() => setAnswer(true)}
        />
      </Cont>
    </>
  );
};
export default Create_Board;

const Cont = styled(Page)`
  padding-bottom: 0;
  .question {
    right: 6%;
    bottom: 20%;
    position: fixed;
  }
`;
const Background = styled.section<{ bg?: string }>`
  min-height: 100vh;
  padding: 3% 12%;
  background: url('/img/random/1.png ') center/cover no-repeat;
  background: ${(p) => p.bg && `url(${p.bg}) center / cover no-repeat`};
`;
