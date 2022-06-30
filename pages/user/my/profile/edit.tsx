import { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import useUser from '../../../../src/libs/client/useUser';
import { DimBackground, Page } from '../../../../styles/global';
import { Title } from '../../../../src/components/Layout/Title';
import { EditUserId } from '../../../../src/components/User/Edit/UserId';
import { EditUserInfo } from '../../../../src/components/User/Edit/UserInfo';
import { DeleteAccount } from '../../../../src/components/User/Delete/Account';
import { EditUserPassword } from '../../../../src/components/User/Edit/UserPassword';
import { EditProfileAvatar } from '../../../../src/components/User/Edit/ProfileAvatar';
import { DeleteAccountModal } from '../../../../src/components/User/Delete/AccountModal';

const EditProfile: NextPage = () => {
  const { loggedInUser } = useUser();
  const [openDel, setOpenDel] = useState(false);
  return (
    <>
      <Title title="프로필 편집" />
      <Cont>
        <Wrapper>
          <article className="flex">
            <EditUserId user={loggedInUser} />
            <EditUserPassword user={loggedInUser} />
            <EditProfileAvatar user={loggedInUser} />
            <EditUserInfo user={loggedInUser} />
          </article>
          <DeleteAccount setOpenDel={setOpenDel} />
        </Wrapper>
      </Cont>
      {openDel && (
        <>
          <DimBackground onClick={() => setOpenDel(false)} />
          <DeleteAccountModal setOpenDel={setOpenDel} />
        </>
      )}
    </>
  );
};
export default EditProfile;

const Cont = styled(Page)`
  padding: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.article`
  gap: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .flex {
    gap: 20px;
    display: flex;
    align-items: center;
  }
`;
