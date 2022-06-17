import { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import useUser from '../../../../src/libs/client/useUser';
import { ModalClose, Page } from '../../../../styles/global';
import { EditUserId } from '../../../../src/components/User/Edit/UserId';
import { EditUserInfo } from '../../../../src/components/User/Edit/UserInfo';
import { DeleteAccount } from '../../../../src/components/User/Delete/DeleteAccount';
import { EditUserPassword } from '../../../../src/components/User/Edit/UserPassword';
import { DeleteAccountModal } from '../../../../src/components/User/Delete/DeleteAcctModal';
import { EditProfileAvatar } from '../../../../src/components/User/Edit/ProfileAvatar';
import { Title } from '../../../../src/components/Layout/Title';

const EditProfile: NextPage = () => {
  const { loggedInUser } = useUser();
  const [openDel, setOpenDel] = useState(false);
  return (
    <>
      <Title title="프로필 편집" />
      <EditProfilePage>
        <div className="flex">
          <EditUserId user={loggedInUser} />
          <EditUserPassword user={loggedInUser} />
          <EditProfileAvatar user={loggedInUser} />
          <EditUserInfo user={loggedInUser} />
        </div>
        <DeleteAccount openDel={openDel} setOpenDel={setOpenDel} />
      </EditProfilePage>
      {openDel && <DeleteAccountModal setOpenDel={setOpenDel} />}
      {openDel && <ModalClose onClick={() => setOpenDel(false)} />}
    </>
  );
};
export default EditProfile;

const EditProfilePage = styled(Page)`
  padding-top: 30px;
  gap: 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  .flex {
    gap: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    h1 {
      font-size: 1.4rem;
    }
    form {
      width: 300px;
    }
  }
`;
