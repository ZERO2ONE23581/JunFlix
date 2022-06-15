import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Page } from '../../../../styles/global';
import { EditUserId } from '../../../../src/components/User/edit/userId';
import { EditProfileAvatar } from '../../../../src/components/User/edit/avatar';

const EditProfile: NextPage = () => {
  return (
    <Page>
      <EditProfileAvatar />
      <EditUserId />
    </Page>
  );
};
export default EditProfile;
