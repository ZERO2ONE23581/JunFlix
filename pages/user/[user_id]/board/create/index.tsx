import { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Page } from '../../../../../styles/global';
import { CreateBoard } from '../../../../../src/components/Board/Create';
import { HeadTitle } from '../../../../../src/components/Title/Head';

const Create: NextPage = () => {
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
  padding: 3% 12%;
  background-color: black;
  background: ${(p) => p.bg && `url(${p.bg}) center / cover no-repeat`};
`;
