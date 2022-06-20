import { useState } from 'react';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { PageWithBg } from '../../../../../styles/global';
import { Title } from '../../../../../src/components/Layout/Title';
import { BoardForm } from '../../../../../src/components/User/Board/Form';

const CreateBoard: NextPage = () => {
  const [preview, setPreview] = useState('');
  return (
    <>
      <Title title="보드생성" />
      <Cont bg={preview}>
        <BoardForm isCreate setPreview={setPreview} />
      </Cont>
    </>
  );
};
export default CreateBoard;

const Cont = styled(PageWithBg)`
  display: flex;
  align-items: center;
  justify-content: center;
`;
