import { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { PageWithBg } from '../../../../../styles/global';
import { Title } from '../../../../../src/components/Layout/Title';
import { CreateBoard } from '../../../../../src/components/Board/Create/CreateBoard';

const CreateBoardPage: NextPage = () => {
  const [preview, setPreview] = useState('');
  return (
    <>
      <Title title="보드생성" />
      <Cont bg={preview}>
        <CreateBoard setPreview={setPreview} />
      </Cont>
    </>
  );
};
export default CreateBoardPage;

const Cont = styled(PageWithBg)`
  padding: 7% 30%;
`;
