import useSWR from 'swr';
import { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Blur, Page } from '../../../../styles/global';
import { HeadTitle } from '../../../../src/components/head_title';
import { IGetUser } from '../../../../src/types/user';
import useUser from '../../../../src/libs/client/useUser';
import { FollowUserModal } from '../../../../src/Tools/Modal/Follow/User';
import { ListWrap } from '../../../../src/components/post/Read/user/DashBoard/List';
import { UserBox } from '../../../../src/components/post/Read/user/DashBoard/UserInfo';
import { FollowingBoards } from '../../../../src/components/post/Read/user/DashBoard/FollowingBoards';

const DashBoard: NextPage<{ theme: boolean }> = ({ theme }) => {
  const router = useRouter();
  const { user_id } = router.query;
  const { loggedInUser } = useUser();
  const { data } = useSWR<IGetUser>(user_id && `/api/user/${user_id}`);
  const username = data?.user?.username;
  //
  const isBlur = false;
  const isMyPage = loggedInUser?.id === Number(user_id);
  const [followModal, setFollowModal] = useState(false);
  const [unFollowModal, setUnFollowModal] = useState(false);

  return (
    <>
      <HeadTitle title={`${username}'s Page`} />
      <Cont>
        <h1>{username}'s Dash Board</h1>
        <Wrap className="wrap">
          <UserBox user={data?.user!} theme={theme} />
          <Blur isBlur={isBlur} className="following-board">
            <FollowingBoards />
          </Blur>
        </Wrap>
        <ListWrap theme={theme} username={username!} />
      </Cont>

      {followModal && (
        <FollowUserModal
          isFollow
          userID={Number(user_id)}
          closeModal={setFollowModal}
          username={data?.User?.username!}
        />
      )}
      {unFollowModal && (
        <FollowUserModal
          isUnFollow
          userID={Number(user_id)}
          closeModal={setUnFollowModal}
          username={data?.User?.username!}
        />
      )}
    </>
  );
};
export default DashBoard;

const Cont = styled(Page)`
  padding: 3em 10em;
  > h1 {
    font-size: 2em;
    width: fit-content;
    margin-bottom: 20px;
  }
  .wrap {
    .user-profile {
    }
    .following-board {
    }
  }
  .list-wrap {
    .list {
      min-height: 50vh;
      height: 100%;
      .likes-wrap {
        min-height: 50vh;
        .lists {
          min-height: 40vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
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

const Wrap = styled.div`
  gap: 20px;
  display: flex;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  .user-profile,
  .following-board {
    width: 100%;
    padding: 40px;
    overflow-y: auto;
    border-radius: 5px;
    min-height: 370px;
    max-height: 370px;
    border: ${(p) => p.theme.border.thick};
    box-shadow: ${(p) => p.theme.boxShadow.nav};
    ::-webkit-scrollbar {
      display: none;
    }
  }
  .user-profile {
    padding: 40px 80px;
  }
`;
