import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { FullHeightPage, Page } from '../../../../../styles/global';
import { EditProfileAvatar } from '../../../../../src/components/User/edit/avatar';
import { EditUserId } from '../../../../../src/components/User/edit/userId';
import { EditUserPassword } from '../../../../../src/components/User/edit/password';
import { EditUserInfo } from '../../../../../src/components/User/edit/userInfo';
import useUser from '../../../../../src/libs/client/useUser';
import { User } from '@prisma/client';

export interface IEditProfileProps {
  user?: User;
}
const EditProfile: NextPage = () => {
  const { loggedInUser } = useUser();
  return (
    <FullHeightPage>
      <EditProfileAvatar user={loggedInUser} />
      <EditUserId user={loggedInUser} />
      <EditUserPassword user={loggedInUser} />
      <EditUserInfo user={loggedInUser} />
      <div className="flex-row"></div>
    </FullHeightPage>
  );
};
export default EditProfile;
