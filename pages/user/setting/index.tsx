import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Page } from '../../../styles/global';
import { UserId } from '../../../src/components/User/Edit/UserId';
import { UserInfo } from '../../../src/components/User/Edit/UserInfo';
import { Password } from '../../../src/components/User/Edit/Password';
import { ProfilePic } from '../../../src/components/User/Edit/ProfilePic';
import { DeleteAccount } from '../../../src/components/User/Delete/Account';
import { HeadTitle } from '../../../src/components/Title/Head';

const EditProfile: NextPage = () => {
  return (
    <>
      <HeadTitle title="프로필 편집" />
      <Cont>
        <Flex>
          <UserId />
          <Password />
          <ProfilePic />
          <UserInfo />
          <DeleteAccount />
        </Flex>
      </Cont>
    </>
  );
};
export default EditProfile;

const Cont = styled(Page)``;
const Flex = styled.div`
  gap: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  .delete {
    top: 70%;
  }
`;
