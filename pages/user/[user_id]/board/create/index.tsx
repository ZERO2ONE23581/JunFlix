import { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Page } from '../../../../../styles/global';
import { CreateBoard } from '../../../../../src/components/Board/Create';
import { HeadTitle } from '../../../../../src/components/Head';
import { useNeedLogin } from '../../../../../src/libs/client/useTools';

const Create: NextPage = () => {
  useNeedLogin();
  const [preview, setPreview] = useState('');
  return (
    <>
      <HeadTitle title="보드생성" />
      <Cont bg={preview}>
        <CreateBoard setPreview={setPreview} isPreview={Boolean(preview)} />
      </Cont>
    </>
  );
};
export default Create;

const Cont = styled(Page)<{ bg?: string }>`
  padding: 3% 10% 10%;
  background: ${(p) => p.bg && `url(${p.bg}) center / cover no-repeat`};
`;
