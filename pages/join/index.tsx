import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../../styles/global';
import { UserIdCheck } from '../../src/components/Join/idCheck';
import { Title } from '../../src/components/Layout/Title';
import { LoginLink } from '../../src/components/Login/LoginLink';
import { JoinForm } from '../../src/components/Join/form';
import { useState } from 'react';
import { JoinAvatar } from '../../src/components/Join/avatar';

const Join: NextPage = () => {
  const [confirmId, setConfirmId] = useState(false);
  const [UserId, setUserId] = useState('');
  const [joinSuccess, setJoinSuccess] = useState(false);
  const [createdID, setCreatedID] = useState(0);
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
          <LoginLink joined={true} />
        </div>
      </JoinPage>
    </>
  );
};
export default Join;

const JoinPage = styled(Page)`
  height: 100%;
  .wrap {
    margin: 0 auto;
    width: 440px;
  }
`;
