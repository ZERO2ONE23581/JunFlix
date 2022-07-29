import { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { FormCont, Page } from '../../../styles/global';
import { CreateUser } from '../../../src/components/User/Join/Create/User';
import { UserId } from '../../../src/components/User/Join/UserId';
import { CreateAvatar } from '../../../src/components/User/Join/Create/Avatar';
import { HeadTitle } from '../../../src/components/Title/Head';

const Join: NextPage = () => {
  const [saveId, setSaveId] = useState('');
  const [userId, setUserId] = useState(false);
  const [avatar, setAvatar] = useState(false);
  const [createdId, setCreatedId] = useState(0);

  return (
    <>
      <HeadTitle title="회원가입" />
      <Cont>
        <Box>
          {!userId && <UserId setSaveId={setSaveId} setUserId={setUserId} />}
          {userId && !avatar && (
            <CreateUser
              saveId={saveId}
              setAvatar={setAvatar}
              setCreatedId={setCreatedId}
            />
          )}
          {avatar && <CreateAvatar createdId={createdId} />}
        </Box>
      </Cont>
    </>
  );
};
export default Join;

const Cont = styled(Page)`
  padding: 10% 34%;
`;
const Box = styled(FormCont)`
  min-width: 450px;
`;
