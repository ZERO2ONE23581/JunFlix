import useSWR from 'swr';
import { useState } from 'react';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { IGetBoard } from '../../../../../src/types/board';
import useUser from '../../../../../src/libs/client/useUser';
import { AVATAR_BG } from '../../../../../src/components/Avatar';
import { useNeedLogin } from '../../../../../src/libs/client/useTools';
import { HeadTitle } from '../../../../../src/components/Head';
import { Board } from '../../../../../src/components/Board/Read';
import { IsPost } from '../../../../../src/components/Post/Read';

const BoardPage: NextPage = () => {
  const { loggedInUser } = useUser();
  const router = useRouter();
  const { user_id, board_id } = router.query;
  const queryID = user_id && board_id;
  const { data } = useSWR<IGetBoard>(
    queryID && `/api/user/${user_id}/board/${board_id}`
  );
  const [preview, setPreview] = useState('');
  const isMyBoard = Boolean(Number(user_id) === loggedInUser?.id);
  return (
    <>
      <HeadTitle title={data?.board?.title!} />
      <Cont avatar={data?.board?.avatar!} preview={preview}>
        <Board
          board={data?.board!}
          setPreview={setPreview}
          isFollowing={data?.isFollowing!}
        />
        <IsPost isMyBoard={isMyBoard} isFollowing={data?.isFollowing!} />
      </Cont>
    </>
  );
};
export default BoardPage;

const Cont = styled(AVATAR_BG)<{ preview: string }>`
  height: 100%;
  min-height: 100vh;
  position: relative;
  padding-bottom: 10%;
`;
