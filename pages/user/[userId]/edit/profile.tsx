import type { NextPage } from 'next';
import { Edit_UserId } from '../../../../src/components/User/Profile/Edit_UserId';
import { Edit_UserInfo } from '../../../../src/components/User/Profile/Edit_UserInfo';
import { Edit_Password } from '../../../../src/components/User/Profile/Edit_Password';
import { Delete_Account } from '../../../../src/components/User/Profile/Delete_Account';
import { PageCont } from '../../../../styles/components/default';
import styled from '@emotion/styled';
import { Edit_Avatar } from '../../../../src/components/User/Profile/Edit_Avatar';

const EditProfile: NextPage = () => {
  //
  return (
    <EditPageCont>
      <Wrap>
        <Edit_Avatar />
        <Edit_UserId />
        <Edit_Password />
        <Edit_UserInfo />
      </Wrap>
      <Delete_Account />
    </EditPageCont>
  );
};
export default EditProfile;

const Wrap = styled.article`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const EditPageCont = styled(PageCont)`
  padding: 20px 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background-color: bisque;
`;
