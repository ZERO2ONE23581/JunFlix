import { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Page } from '../../../../../styles/global';
import { Title } from '../../../../../src/components/Layout/Title';
import { IconBtn } from '../../../../../src/components/Style/Button/IconBtn';
import { CreateBoard } from '../../../../../src/components/Board/Create';

const CreateBoardPage: NextPage = () => {
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
          type="button"
          svgType="question"
          onClick={() => setAnswer(true)}
        />
      </Cont>
    </>
  );
};
export default CreateBoardPage;

const Cont = styled(Page)`
  padding: 0 10%;
  .question {
    right: 3%;
    bottom: 10%;
    position: absolute;
    svg {
      width: 40px;
      height: 40px;
    }
  }
`;
const Background = styled.section<{ bg?: string }>`
  min-height: 100vh;
  padding-top: 15%;
  background-color: #2d3436;
  background: ${(p) => p.bg && `url(${p.bg})   center / cover no-repeat`};
`;
