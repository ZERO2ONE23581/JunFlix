import type { NextPage } from 'next';
import { Account } from '../../src/components/User/Profile/Account';
import { UserInfo } from '../../src/components/User/Profile/UserInfo';
import { PageContainer } from '../../styles/global-style';

const Profile: NextPage = () => {
  //
  return (
    <PageContainer>
      <Account />
      <UserInfo />
    </PageContainer>
  );
};

export default Profile;
