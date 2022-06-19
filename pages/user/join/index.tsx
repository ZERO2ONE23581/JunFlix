import { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Page } from '../../../styles/global';
import { Title } from '../../../src/components/Layout/Title';
import { LinkWrap } from '../../../src/components/Style/Button/Link';
import { CreateUser } from '../../../src/components/User/Join/Create/User';
import { CheckUserId } from '../../../src/components/User/Join/CheckUserId';
import { CreateProfileAvatar } from '../../../src/components/User/Join/Create/Avatar';

const Join: NextPage = () => {
  const [createdID, setCreatedID] = useState(0);
  const [savedUserID, setSavedUserID] = useState('');
  const [openCreateUser, setOpenCreateUser] = useState(false);
  const [openCreateAvatar, setOpenCreateAvatar] = useState(false);

  return (
    <>
      <Title title="회원가입" />
      <Cont>
        <Wrapper>
          {!openCreateUser && (
            <CheckUserId
              setSavedUserID={setSavedUserID}
              setOpenCreateUser={setOpenCreateUser}
            />
          )}
          {openCreateUser && !openCreateAvatar && (
            <CreateUser
              savedUserID={savedUserID}
              setCreatedID={setCreatedID}
              setOpenCreateAvatar={setOpenCreateAvatar}
            />
          )}
          {openCreateAvatar && <CreateProfileAvatar createdID={createdID} />}
          <LinkWrap isJoin />
        </Wrapper>
      </Cont>
    </>
  );
};
export default Join;

const Cont = styled(Page)`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.article`
  margin: 0 auto;
  max-width: 620px;
`;
