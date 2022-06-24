import { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { PageWithBg } from '../../../../../../styles/global';
import { Title } from '../../../../../../src/components/Layout/Title';
import { AvatarURL } from '../../../../../../src/components/User/Avatar/AvatarURL';
import { BoardForm } from '../../../../../../src/components/User/Board/Form';

const EditBoard: NextPage = () => {
  const [preview, setPreview] = useState('');
  const [avatar, setAvatar] = useState('');
  return (
    <>
      <Title title="보드수정" />
      <Cont bg={preview ? preview : avatar ? AvatarURL(avatar) : null}>
        <BoardForm isEdit setPreview={setPreview} setAvatar={setAvatar} />
      </Cont>
    </>
  );
};
export default EditBoard;

const Cont = styled(PageWithBg)`
  display: flex;
  align-items: center;
  justify-content: center;
`;
