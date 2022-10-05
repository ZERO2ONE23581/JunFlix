import useSWR from 'swr';
import { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Blur, Page } from '../../../../../styles/global';
import { IData } from '../../../../../src/types/global';
import { Svg } from '../../../../../src/components/Tools/Svg';
import { HeadTitle } from '../../../../../src/components/Head';
import { UserList } from '../../../../../src/components/User/Read/DashBoard/List';
import { UserInfo } from '../../../../../src/components/User/Read/DashBoard/UserInfo';
import { FollowUserModal } from '../../../../../src/components/Tools/Modal/Follow/User';
import { FollowingBoards } from '../../../../../src/components/User/Read/DashBoard/FollowingBoards';
import useUser from '../../../../../src/libs/client/useUser';
import { Title } from '../../../../../src/components/User/Read/DashBoard/Title';

const DashBoard: NextPage = () => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  const { user_id } = router.query;
  const { data } = useSWR<IData>(user_id && `/api/user/${user_id}`);
  //
  const [followModal, setFollowModal] = useState(false);
  const [unFollowModal, setUnFollowModal] = useState(false);
  const { data: followData } = useSWR<IData>(
    user_id && `/api/user/${user_id}/follow`
  );
  const isMyPage = loggedInUser?.id === Number(user_id);
  const isFollowing = followData?.isFollowing;
  const isBlur = !isMyPage && !isFollowing;

  return (
    <>
      <HeadTitle title={`${data?.User?.username}'s Page`} />
      <Cont>
        <Title
          isBlur={isBlur}
          isMyPage={isMyPage}
          isFollowing={isFollowing!}
          setFollowModal={setFollowModal}
          username={data?.User?.username!}
          setUnFollowModal={setUnFollowModal}
        />
        <Wrap>
          <UserInfo
            userInfo={{
              id: data?.User?.id!,
              name: data?.User?.name!,
              email: data?.User?.email!,
              userId: data?.User?.userId!,
              avatar: data?.User?.avatar!,
              username: data?.User?.username!,
            }}
            counts={{
              posts: data?.User?.posts.length!,
              boards: data?.User?.boards.length!,
              reviews: data?.User?.reviews.length!,
            }}
            follow={{
              isFollowing: isFollowing!,
              followers: data?.Followers!,
              followings: data?.Followings!,
            }}
          />
          <Blur isBlur={isBlur} className="following-board">
            <FollowingBoards />
          </Blur>
        </Wrap>

        {isBlur && (
          <Svg type="lock" size="2.2rem" onClick={() => setFollowModal(true)} />
        )}
        <Blur isBlur={isBlur}>
          <UserList username={data?.User?.username!} />
        </Blur>
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
  padding-top: 50px;
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
    border: 2px solid blue;
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
