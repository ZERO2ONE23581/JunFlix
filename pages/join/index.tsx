import { useState } from 'react';
import type { NextPage } from 'next';
import { FullHeightPage } from '../../styles/global';
import { LinkWrap } from '../../src/components/Link';
import { Title } from '../../src/components/Layout/Title';
import { CreateUser } from '../../src/components/User/create';
import { CheckUserId } from '../../src/components/User/CheckUserId';
import { CreateProfileAvatar } from '../../src/components/User/create/avatar';

const Join: NextPage = () => {
  const [UserId, setUserId] = useState('');
  const [createdID, setCreatedID] = useState(0);
  const [confirmId, setConfirmId] = useState(false);
  const [joinSuccess, setJoinSuccess] = useState(false);
  return (
    <>
      <Title title="회원가입" />
      <FullHeightPage>
        <div className="form-wrap">
          <CheckUserId
            confirmId={confirmId}
            setConfirmId={setConfirmId}
            setUserId={setUserId}
          />
          <CreateUser
            confirmId={confirmId}
            UserId={UserId}
            joinSuccess={joinSuccess}
            setJoinSuccess={setJoinSuccess}
            setCreatedID={setCreatedID}
          />
          <CreateProfileAvatar
            joinSuccess={joinSuccess}
            createdID={createdID}
          />
          <LinkWrap join />
        </div>
      </FullHeightPage>
    </>
  );
};
export default Join;
