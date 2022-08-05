import useSWR from 'swr';
import { useState } from 'react';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { IGetBoard } from '../../../../../../src/types/board';
import { IGetAllPosts } from '../../../../../../src/types/post';
import { HeadTitle } from '../../../../../../src/components/Layout/Head';
import { Board } from '../../../../../../src/components/Board/Read/Each';
import { PostList } from '../../../../../../src/components/Post/Read/List';
import { AVATAR_BG } from '../../../../../../src/components/Avatar';
import { useNeedLogin } from '../../../../../../src/libs/client/useTools';

const BoardPage: NextPage = () => {
  useNeedLogin();
  const router = useRouter();
  const { user_id, board_id } = router.query;
  const queryIds = user_id && board_id;
  const { data } = useSWR<IGetBoard>(
    queryIds && `/api/user/${user_id}/board/${board_id}`
  );
  const isAnyBoard = Boolean(data?.board);
  const isAnyPost = Boolean(data?.board?.posts?.length! > 0);
  const { data: PostData } = useSWR<IGetAllPosts>(
    queryIds && `/api/user/${user_id}/board/${board_id}/post`
  );
  const [preview, setPreview] = useState('');
  return (
    <>
      <HeadTitle title={data?.board?.title!} />
      {isAnyBoard && (
        <>
          <Cont avatar={data?.board?.avatar!} preview={preview}>
            <Board board={data?.board!} setPreview={setPreview} />
            {isAnyPost && (
              <PostList from={6} size={3} posts={PostData?.posts!} />
            )}
            {!isAnyPost && <h1>no post found</h1>}
          </Cont>
        </>
      )}
      {!isAnyBoard && <h1>NO BOARD FOUND..</h1>}
    </>
  );
};
export default BoardPage;

const Cont = styled(AVATAR_BG)<{ preview: string }>`
  height: 100%;
  min-height: 100vh;
  padding: 3% 10% 10%;
`;
