import type { NextPage } from 'next';
import { Edit_UserId } from '../../../../src/components/User/Profile/Edit_UserId';
import { Edit_UserInfo } from '../../../../src/components/User/Profile/Edit_UserInfo';
import { Edit_Password } from '../../../../src/components/User/Profile/Edit_Password';
import { Delete_Account } from '../../../../src/components/User/Profile/Delete_Account';
import { PageCont } from '../../../../styles/components/default';
import styled from '@emotion/styled';

const EditProfile: NextPage = () => {
  //
  return (
    <EditPageCont>
      <Wrap>
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
  display: flex;
  align-items: center;
  gap: 20px;
`;
export const EditPageCont = styled(PageCont)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background-color: bisque;
`;
