import { useState } from 'react';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../../styles/global';
import { Title } from '../../src/components/Layout/Title';
import { JoinForm } from '../../src/components/Join/form';
import { JoinAvatar } from '../../src/components/Join/avatar';
import { LoginLink } from '../../src/components/Login/LoginLink';
import { UserIdCheck } from '../../src/components/Join/userIdCheck';

const Join: NextPage = () => {
  const [UserId, setUserId] = useState('');
  const [createdID, setCreatedID] = useState(0);
  const [confirmId, setConfirmId] = useState(false);
  const [joinSuccess, setJoinSuccess] = useState(false);
  return (
    <>
      <Title title="회원가입" />
      <JoinPage>
        <div className="wrap">
          <UserIdCheck
            confirmId={confirmId}
            setConfirmId={setConfirmId}
            setUserId={setUserId}
          />
          <JoinForm
            confirmId={confirmId}
            UserId={UserId}
            joinSuccess={joinSuccess}
            setJoinSuccess={setJoinSuccess}
            setCreatedID={setCreatedID}
          />
          <JoinAvatar joinSuccess={joinSuccess} createdID={createdID} />
          <LoginLink join />
        </div>
      </JoinPage>
    </>
  );
};
export default Join;

const JoinPage = styled(Page)`
  .wrap {
    width: 420px;
  }
`;
