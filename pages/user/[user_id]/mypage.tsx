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
import { CreatePost } from '../../../src/components/post/create/create_post';
import { motion } from 'framer-motion';
import { Created } from '../../../src/components/user/read/mypage/content_created';

const DashBoard: NextPage<{ theme: boolean }> = ({ theme }) => {
  const router = useRouter();
  const { user_id } = router.query;
  const { data } = useSWR<IGetUser>(user_id && `/api/user/${user_id}`);
  const user = data?.user;
  const { loggedInUser } = useUser();
  const [category, setCategory] = useState('created');
  const [createPost, setCreatePost] = useState(false);
  const { isFollowing } = useFollow(Number(user_id), 'user');
  //
  return (
    <>
      <HeadTitle title={`${user?.username}'s Page`} />
      <Page>
        <>
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
          <MyContents
            exit="exit"
            key={category}
            initial="initial"
            animate="animate"
            variants={contentVar}
            className="my-contents"
          >
            <Created selected={category} theme={theme} />
          </MyContents>
        </>
        <CreatePost
          theme={theme}
          modal={createPost}
          closeModal={() => setCreatePost(false)}
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
  padding-top: 30px;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  .host {
    //border: 1px solid yellow;
  }
  .btn-wrap {
    //border: 1px solid yellow;
    margin-top: 20px;
    button {
      font-size: 1.4rem;
    }
  }
  .lock {
    top: 65%;
    left: 50%;
    z-index: 1;
    position: absolute;
    transform: translate(-50%, 0%);
  }
`;
const MyContents = styled(motion.section)`
  width: 100%;
  height: 100%;
  min-height: 40vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  .my-posts,
  .create-grid {
    gap: 30px;
    padding: 0 20px;
    margin: 3rem auto;
  }
  .create-grid {
    width: 50vw;
    min-width: 960px;
  }
  .my-posts {
    width: 100vw;
    width: fit-content;
    margin: 0 auto;
    //border: 5px solid yellow;
    .post-box,
    .box {
      //border: 2px solid blue;
      width: fit-content;
      margin: 0 auto;
      max-width: 320px;
      max-height: 420px;
    }
    .img-cover {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
`;
const contentVar = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 1 },
  },
  exit: {
    opacity: 0,
    transition: { delay: 1, duration: 4 },
  },
};
