import useSWR from 'swr';
import { useState } from 'react';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { PageWithBg } from '../../../../../../styles/global';
import { IGetBoard } from '../../../../../../src/types/board';
import { Title } from '../../../../../../src/components/Layout/Title';
import { AvatarUrl } from '../../../../../../src/components/User/Avatar/AvatarURL';
import { ReadBoard } from '../../../../../../src/components/User/Board/Read/Board';
import { EditAvatar } from '../../../../../../src/components/User/Board/Read/Edit/EditAvatar';

const BoardPage: NextPage = () => {
  const router = useRouter();
  const { user_id, board_id } = router.query;
  const QueryId = user_id && board_id;
  const { data } = useSWR<IGetBoard>(
    QueryId && `/api/user/${user_id}/board/${board_id}`
  );
  const [boardPreview, setBoardPreview] = useState('');
  const owner = data?.board?.title;
  return (
    <>
      <Title title={`${owner}`} />
      <Page bg={AvatarUrl(data?.board?.avatar!)} preview={boardPreview}>
        <EditAvatar setBoardPreview={setBoardPreview} />
        <ReadBoard board={data?.board} />
      </Page>
    </>
  );
};
export default BoardPage;

const Page = styled(PageWithBg)<{ preview: string }>`
  position: relative;
  min-width: 100vw;
  height: 100%;
  padding: 3% 10%;
  min-height: 100vh;
  background: ${(p) =>
    p.preview && `url(${p.preview})   center / cover no-repeat`};
`;
