import useSWR from 'swr';
import { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { BtnsWrap } from '../../../src/components/user/read/mypage/btnWrap';
import { useRouter } from 'next/router';
import { IGetUser } from '../../../src/types/user';
import useUser from '../../../src/libs/client/useUser';
import { HeadTitle } from '../../../src/Tools/head_title';
import useFollow from '../../../src/libs/client/useFollow';
import { Host } from '../../../src/components/user/read/mypage/Host';
import { CreatePost } from '../../../src/components/post/create/create_post_modal';
import { Created } from '../../../src/components/user/read/mypage/content_created';
import { SelectBoardModal } from '../../../src/components/post/create/select_board_modal';

const DashBoard: NextPage<{ theme: boolean }> = ({ theme }) => {
  const router = useRouter();
  const { user_id } = router.query;
  const { data } = useSWR<IGetUser>(user_id && `/api/user/${user_id}`);
  const user = data?.user;
  const { loggedInUser } = useUser();
  const [category, setCategory] = useState('created');
  const [createPost, setCreatePost] = useState(false);
  const { isFollowing } = useFollow(Number(user_id), 'user');
  const [selectBoard, setSelectBoard] = useState(false);
  const [post_id, setPost_id] = useState(0);
  //
  return (
    <>
      <HeadTitle title={`${user?.username}'s Page`} />
      <Page>
        <Host host={user!} theme={theme} />
        <BtnsWrap
          theme={theme}
          category={category}
          setCategory={setCategory}
          setCreatePost={setCreatePost}
          isMyPage={Boolean(loggedInUser?.id === user?.id)}
        />
        {/* <Layer>
        <Blur className="block" isBlur={isBlur}></Blur>
        {isBlur && <Svg type="lock" theme={theme} item={{ size: '2rem' }} />}
      </Layer> */}
        <Created open={category === 'created'} theme={theme} />

        <CreatePost
          theme={theme}
          modal={createPost}
          setModal={{
            close: () => setCreatePost(false),
            open_select: () => setSelectBoard(true),
            save_post_id: (id: number) => setPost_id(id),
          }}
        />
        <SelectBoardModal
          theme={theme}
          post_id={post_id}
          modal={selectBoard}
          closeModal={() => setSelectBoard(false)}
        />
      </Page>
    </>
  );
};
export default DashBoard;

const Page = styled.section`
  gap: 40px;
  display: flex;
  height: 100%;
  min-height: 100vh;
  padding-top: 30px;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  .lock {
    top: 65%;
    left: 50%;
    z-index: 1;
    position: absolute;
    transform: translate(-50%, 0%);
  }
`;
