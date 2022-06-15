import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Page } from '../../../../styles/global';
import { EditProfileAvatar } from '../../../../src/components/User/edit/avatar';
import { EditUserId } from '../../../../src/components/User/edit/userId';
import { EditUserPassword } from '../../../../src/components/User/edit/password';
import { EditUserInfo } from '../../../../src/components/User/edit/userInfo';
import useUser from '../../../../src/libs/client/useUser';
import { User } from '@prisma/client';

export interface IEditProfileProps {
  user?: User;
}
const EditProfile: NextPage = () => {
  const { loggedInUser } = useUser();
  return (
    <EditProfilePage>
      <div className="flex">
        <EditProfileAvatar user={loggedInUser} />
        <EditUserId user={loggedInUser} />
        <EditUserPassword user={loggedInUser} />
        <EditUserInfo user={loggedInUser} />
      </div>
    </EditProfilePage>
  );
};
export default EditProfile;

const EditProfilePage = styled(Page)`
  .flex {
    gap: 20px;
    display: flex;
    align-items: center;
  }
`;
