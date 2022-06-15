import { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { User } from '@prisma/client';
import { Page } from '../../../../styles/global';
import { ModalClose } from '../../../../styles/modal';
import useUser from '../../../../src/libs/client/useUser';
import { DeleteAccount } from '../../../../src/components/User/delete';
import { EditUserId } from '../../../../src/components/User/edit/userId';
import { EditUserInfo } from '../../../../src/components/User/edit/userInfo';
import { EditProfileAvatar } from '../../../../src/components/User/edit/avatar';
import { EditUserPassword } from '../../../../src/components/User/edit/password';
import { DeleteAccountModal } from '../../../../src/components/User/delete/modal';

export interface IEditProfileProps {
  user?: User;
}
const EditProfile: NextPage = () => {
  const { loggedInUser } = useUser();
  const [openDel, setOpenDel] = useState(false);
  return (
    <>
      <Cont>
        <section className="flex-row">
          <EditUserId user={loggedInUser} />
          <EditUserPassword user={loggedInUser} />
          <EditProfileAvatar user={loggedInUser} />
          <EditUserInfo user={loggedInUser} />
        </section>
        <DeleteAccount openDel={openDel} setOpenDel={setOpenDel} />
      </Cont>
      {openDel && <DeleteAccountModal setOpenDel={setOpenDel} />}
      {openDel && <ModalClose onClick={() => setOpenDel(false)} />}
    </>
  );
};
export default EditProfile;

const Cont = styled(Page)`
  margin-top: 100px;
  height: 90vh;
  position: relative;
`;
