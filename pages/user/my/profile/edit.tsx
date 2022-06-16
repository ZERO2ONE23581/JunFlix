import { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import useUser from '../../../../src/libs/client/useUser';
import { ModalClose, Page } from '../../../../styles/global';
import { EditUserId } from '../../../../src/components/User/Edit/EditUserId';
import { EditUserInfo } from '../../../../src/components/User/Edit/EditUserInfo';
import { DeleteAccount } from '../../../../src/components/User/Delete/DeleteAccount';
import { EditUserPassword } from '../../../../src/components/User/Edit/EditUserPassword';
import { DeleteAccountModal } from '../../../../src/components/User/Delete/DeleteAcctModal';
import { EditProfileAvatar } from '../../../../src/components/User/Edit/EditProfileAvatar';

const EditProfile: NextPage = () => {
  const { loggedInUser } = useUser();
  const [openDel, setOpenDel] = useState(false);
  console.log(openDel);
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
