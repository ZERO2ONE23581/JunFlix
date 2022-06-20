import { useState } from 'react';
import type { NextPage } from 'next';
import { CreateBoardForm } from '../../../../../src/components/User/Board/Create/BoardForm';
import { Background } from '../../../../../src/components/User/Avatar/Background';
import styled from '@emotion/styled';
import { Title } from '../../../../../src/components/Layout/Title';

const CreateBoard: NextPage = () => {
  const [preview, setPreview] = useState('');
  return (
    <>
      <Title title="보드생성" />
      <Cont bg={preview}>
        <CreateBoardForm setPreview={setPreview} />
      </Cont>
    </>
  );
};
export default CreateBoard;
const Cont = styled(Background)`
  display: flex;
  align-items: center;
  justify-content: center;
`;
