import useSWR from 'swr';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Blur, BtnWrap, Layer } from '../../../../styles/global';
import { IGetUser } from '../../../../src/types/user';
import useUser from '../../../../src/libs/client/useUser';
import { HeadTitle } from '../../../../src/Tools/head_title';
import { Host } from '../../../../src/components/user/read/dash/Host';
import { MyBtn } from '../../../../src/Tools/Button/my_btn';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Svg } from '../../../../src/Tools/Svg';
import useFollow from '../../../../src/libs/client/useFollow';

const DashBoard: NextPage<{ theme: boolean }> = ({ theme }) => {
  const router = useRouter();
  const { user_id } = router.query;
  const { loggedInUser } = useUser();
  const { data } = useSWR<IGetUser>(user_id && `/api/user/${user_id}`);
  const host = data?.user!;
  const username = data?.user?.username;
  const [category, setCategory] = useState('created');
  const onClick = (type: string) => setCategory(type);
  //
  const { isFollowing } = useFollow(Number(user_id), 'user');
  const isMyPage = Boolean(loggedInUser?.id === host?.id);
  const isBlur = Boolean(!isMyPage && !isFollowing);
  //
  return (
    <>
      <HeadTitle title={`${username}'s Page`} />
      <Cont>
        <Host host={host} theme={theme} />

        <BtnWrap className="control-btns">
          <MyBtn
            type="button"
            onClick={() => onClick('created')}
            item={{ theme, name: 'Created', category }}
          />
          <MyBtn
            type="button"
            onClick={() => onClick('saved')}
            item={{ theme, name: 'Saved', category }}
          />
          <MyBtn
            type="button"
            onClick={() => onClick('likes')}
            item={{ theme, name: 'Likes', category }}
          />
        </BtnWrap>

        <Layer className="layer">
          <Blur className="block" isBlur={isBlur}>
            <ContentsWrap
              exit="exit"
              initial="initial"
              animate="animate"
              key={category}
              variants={contentVar}
            >
              {category === 'likes' && <h2>likes</h2>}
              {category === 'saved' && <h2>saved boards</h2>}
              {category === 'created' && <h2>created contents</h2>}
            </ContentsWrap>
          </Blur>
          {isBlur && <Svg type="lock" size="2rem" theme={theme} />}
        </Layer>
      </Cont>
    </>
  );
};
export default DashBoard;

const Cont = styled.section`
  height: 100vh;
  padding-top: 30px;
  gap: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  > article {
    padding: 20px;
  }
  .host-box {
    width: 100vw;
    border: 5px solid yellowgreen;
  }
  .following-boards {
    width: 100vw;
    border: 5px solid orangered;
  }
  .lock {
    top: 65%;
    left: 50%;
    z-index: 1;
    position: absolute;
    transform: translate(-50%, 0%);
  }
  .control-btns {
    gap: 20px;
    margin: 0 auto;
    width: fit-content;
    //border: 2px solid blue;
    button {
      //border: 2px solid hotpink;
      width: 100px;
      padding-bottom: 10px;
    }
  }
`;
const ContentsWrap = styled(motion.div)`
  width: 100vw;
  height: 50vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  h2 {
    font-size: 2rem;
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
