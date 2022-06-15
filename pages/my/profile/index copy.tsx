import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Edit_Avatar } from '../../../src/components/User/Edit/Edit_Avatar';
import { Edit_UserId } from '../../../src/components/User/Edit/UserId';
import { Edit_Password } from '../../../src/components/User/Edit/Password';
import { Edit_UserInfo } from '../../../src/components/User/Edit/UserInfo';
import { Delete_Account } from '../../../src/components/User/Delete';
import { Page } from '../../../styles/global';

const EditProfile: NextPage = () => {
  //
  return (
    <Page>
      <Wrap>
        <Edit_Avatar />
        <Edit_UserId />
        <Edit_Password />
        <Edit_UserInfo />
      </Wrap>
      <Delete_Account />
    </Page>
  );
};
export default EditProfile;

const Wrap = styled.article`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
