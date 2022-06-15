import { useState } from 'react';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../../styles/global';
import { LinkWrap } from '../../src/components/Link';
import { Title } from '../../src/components/Layout/Title';
import { CreateUser } from '../../src/components/User/create';
import { CheckUserId } from '../../src/components/User/checkUserId';
import { CreateProfileAvatar } from '../../src/components/User/create/avatar';

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
