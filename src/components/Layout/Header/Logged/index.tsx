import { Modal } from './Modal';
import { useState } from 'react';
import useUser from '../../../../libs/client/useUser';
import { ProfileAvatar } from '../../../Avatar/ProfileAvatar';

export const LoggedIn = () => {
  const { loggedInUser } = useUser();
  const [open, setOpen] = useState(false);
  return (
    <>
      <ProfileAvatar
        size="3.3rem"
        avatar={loggedInUser?.avatar}
        onClick={() => setOpen((p: boolean) => !p)}
      />
      {open && <Modal user={loggedInUser} setOpen={setOpen} />}
    </>
  );
};
