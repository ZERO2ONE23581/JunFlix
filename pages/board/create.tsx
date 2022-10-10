import { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Page } from '../../styles/global';
import { CreateBoard } from '../../src/components/Board/Create';
import { HeadTitle } from '../../src/components/Head';

const Create_Board: NextPage<{ theme: boolean }> = ({ theme }) => {
  const [preview, setPreview] = useState('');
  return (
    <>
      <HeadTitle title="보드생성" />
      <Cont bg={preview}>
        <CreateBoard
          theme={theme}
          setPreview={setPreview}
          isPreview={Boolean(preview)}
        />
      </Cont>
    </>
  );
};
export default Create_Board;

const Cont = styled(Page)<{ bg?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(p) => p.bg && `url(${p.bg}) center / cover no-repeat`};
`;
