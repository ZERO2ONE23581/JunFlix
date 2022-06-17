import { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Page } from '../../../styles/global';
import { Title } from '../../../src/components/Layout/Title';
import { LinkWrap } from '../../../src/components/Style/LinkWrap';
import { CreateUser } from '../../../src/components/User/Join/Create/User';
import { CheckUserId } from '../../../src/components/User/Join/Check/UserId';
import { CreateProfileAvatar } from '../../../src/components/User/Join/Create/Avatar';

const Join: NextPage = () => {
  const [UserId, setUserId] = useState('');
  const [createdID, setCreatedID] = useState(0);
  const [confirmId, setConfirmId] = useState(false);
  const [joinSuccess, setJoinSuccess] = useState(false);
  return (
    <>
      <Title title="회원가입" />
      <Cont>
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
          <LinkWrap isJoin />
        </div>
      </Cont>
    </>
  );
};
export default Join;

const Cont = styled(Page)`
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
