import useSWR from 'swr';
import { useState } from 'react';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { PageWithBg } from '../../../../../../styles/global';
import { IGetBoard } from '../../../../../../src/types/board';
import { Title } from '../../../../../../src/components/Layout/Title';
import { AvatarURL } from '../../../../../../src/components/Avatar/AvatarInput';
import { ReadBoard } from '../../../../../../src/components/Board/Read/ReadBoard';
import { FixedBtnWrap } from '../../../../../../src/components/Board/Read/FixedBtnWrap';
import { EditBackground } from '../../../../../../src/components/Board/Edit/EditBackground';

const BoardPage: NextPage = () => {
  const router = useRouter();
  const { user_id, board_id } = router.query;
  const [editBoard, setEditBoard] = useState(false);
  const [preview, setPreview] = useState('');
  const { data } = useSWR<IGetBoard>(
    user_id && board_id && `/api/user/${user_id}/board/${board_id}`
  );
  const owner = data?.board?.title;
  return (
    <>
      <Title title={`${owner}`} />
      <Page bg={AvatarURL(data?.board?.avatar!)} preview={preview}>
        <ReadBoard board={data?.board} editBoard={editBoard} />
        <FixedBtnWrap
          setPreview={setPreview}
          editBoard={editBoard}
          setEditBoard={setEditBoard}
        />
      </Page>
    </>
  );
};
export default BoardPage;

const Page = styled(PageWithBg)<{ preview: string }>`
  position: relative;
  padding: 1% 12%;
  height: 100%;
  min-width: 100vw;
  min-height: 100vh;
  background: ${(p) =>
    p.preview && `url(${p.preview})   center / cover no-repeat`};
`;
