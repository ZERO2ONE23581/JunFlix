import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Page } from '../../../styles/global';
import { UserId } from '../../../src/components/User/Update/UserId';
import { UserInfo } from '../../../src/components/User/Update/UserInfo';
import { Password } from '../../../src/components/User/Update/Password';
import { Avatar } from '../../../src/components/Avatar/user_edit';
import { DeleteUser } from '../../../src/components/User/Delete';
import { HeadTitle } from '../../../src/components/Layout/Head';

const EditProfile: NextPage = () => {
  return (
    <>
      <HeadTitle title="프로필 편집" />
      <Cont>
        <Flex>
          <UserId />
          <Password />
          <Avatar />
          <UserInfo />
          <DeleteUser />
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
