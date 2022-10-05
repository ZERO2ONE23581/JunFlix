import { useState } from 'react';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../styles/global';
import { HeadTitle } from '../src/components/Head';
import { CreateUser } from '../src/components/User/Create';
import { useNeedLogout } from '../src/libs/client/useTools';
import { CreateId } from '../src/components/User/Create/UserId';
import { CreateUserAvatar } from '../src/components/Avatar/User/Create';

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
            setUserId={setUserId}
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
