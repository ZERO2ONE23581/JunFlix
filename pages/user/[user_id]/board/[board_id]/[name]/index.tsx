import useSWR from 'swr';
import { useState } from 'react';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { AVATAR_BG } from '../../../../../../styles/global';
import { IGetBoard } from '../../../../../../src/types/board';
import { IGetAllPosts } from '../../../../../../src/types/post';
import { HeadTitle } from '../../../../../../src/components/Title/Head';
import { Board } from '../../../../../../src/components/Board/Read/Each';
import { PostList } from '../../../../../../src/components/Post/Read/List';

const BoardPage: NextPage = () => {
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
            {isAnyPost && <PostList size={4} posts={PostData?.posts!} />}
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
  height: 100vh;
  padding: 3% 12%;
  background-color: ${(p) => p.theme.color.font};
  background: ${(p) =>
    p.preview && `url(${p.preview}) center / cover no-repeat`};
`;
