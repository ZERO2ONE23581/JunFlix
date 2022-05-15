import type { NextPage } from 'next';
import { Edit_Password } from '../../../src/components/User/Profile/Edit_Password';
import { Edit_UserId } from '../../../src/components/User/Profile/Edit_UserId';
import { Edit_UserInfo } from '../../../src/components/User/Profile/Edit_UserInfo';
import { ProEditPgCont } from '../../../styles/profileEdit-style';

const Profile: NextPage = () => {
  //
  return (
    <ProEditPgCont>
      <Edit_UserId />
      <Edit_Password />
      <Edit_UserInfo />
    </ProEditPgCont>
  );
};

export default Profile;
