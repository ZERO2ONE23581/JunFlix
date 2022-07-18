import Link from 'next/link';
import { Modal } from './Modal';
import styled from '@emotion/styled';
import useUser from '../../../../libs/client/useUser';
import { ProfileAvatar } from '../../../Avatar/ProfileAvatar';
import { useState } from 'react';
import { DimBackground } from '../../../../../styles/global';
import { Login } from './Login';

export const Profile = ({}: any) => {
  const { isLoggedIn, loggedInUser } = useUser();
  const [open, setOpen] = useState(false);
  return (
    <Cont>
      {isLoggedIn && (
        <ProfileAvatar
          size="3.3rem"
          avatar={loggedInUser?.avatar}
          onClick={() => setOpen((p: boolean) => !p)}
        />
      )}
      {open && <Modal user={loggedInUser} setOpen={setOpen} />}
      {!isLoggedIn && <Login />}
    </Cont>
  );
};
const Cont = styled.section`
  position: relative;
`;
