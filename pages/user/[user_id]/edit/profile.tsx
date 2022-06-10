import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Edit_Avatar } from '../../../../src/components/User/Edit/Edit_Avatar';
import { Edit_UserId } from '../../../../src/components/User/Edit/UserId';
import { Edit_Password } from '../../../../src/components/User/Edit/Password';
import { Edit_UserInfo } from '../../../../src/components/User/Edit/UserInfo';
import { Delete_Account } from '../../../../src/components/User/Delete';
import { PageCont } from '../../../../styles/default';

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
