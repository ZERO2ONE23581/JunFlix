import { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Page } from '../styles/global';
import { CreateUser } from '../src/components/User/Create';
import { CreateUserAvatar } from '../src/components/Avatar/User/Create';
import { HeadTitle } from '../src/components/Layout/Head';
import { CreateId } from '../src/components/User/Create/UserId';
import { useNeedLogout } from '../src/libs/client/useTools';

const Join: NextPage = () => {
  const [saveId, setSaveId] = useState('');
  const [userId, setUserId] = useState(false);
  const [avatar, setAvatar] = useState(false);
  const [createdId, setCreatedId] = useState(0);
  useNeedLogout();
  return (
    <>
      <HeadTitle title="회원가입" />
      <Cont>
        {!userId && <CreateId setSaveId={setSaveId} setUserId={setUserId} />}
        {userId && !avatar && (
          <CreateUser
            saveId={saveId}
            setAvatar={setAvatar}
            setCreatedId={setCreatedId}
          />
        )}
        {avatar && <CreateUserAvatar createdId={createdId} />}
      </Cont>
    </>
  );
};
export default Join;

const Cont = styled(Page)`
  padding: 0;
`;
