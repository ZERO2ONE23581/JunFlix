import styled from '@emotion/styled';
import { Following } from '@prisma/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Blur, SmallModal } from '../../../../../../styles/global';
import useUser from '../../../../../libs/client/useUser';
import { ProfileAvatar } from '../../../../Avatar/Profile';
import { ModalBtn } from '../../../../../Tools/Button/Modal/User';
import { Svg } from '../../../../../Tools/Svg';
import { Counts } from './Counts';
import { Detail } from './Detail';
import { UserFollow } from './UserFollow';

interface IProflie {
  userInfo: {
    id: number;
    name: string;
    email: string;
    userId: string;
    avatar: string;
    username: string;
  };
  counts: {
    boards: number;
    posts: number;
    reviews: number;
  };
  follow: {
    isFollowing: boolean;
    followers: Following[];
    followings: Following[];
  };
}
export const UserInfo = ({ userInfo, counts, follow }: IProflie) => {
  const router = useRouter();
  const { user_id } = router.query;
  const { loggedInUser } = useUser();
  const [setting, setSetting] = useState(false);
  const [modal, setModal] = useState(false);
  const isMyDash = Boolean(loggedInUser?.id === Number(user_id));
  return (
    <>
      <Box className="user-profile">
        <div className="flex">
          <ProfileAvatar size={'8rem'} avatar={userInfo?.avatar} />
          {userInfo && (
            <Detail
              isMyDash={isMyDash}
              name={userInfo.name}
              email={userInfo.email}
              userId={userInfo.userId}
              username={userInfo.username}
            />
          )}
          {isMyDash && (
            <Svg type="setting" size="2rem" onClick={() => setSetting(true)} />
          )}
        </div>

        <FollowCounts>
          <Svg type="users" size="2rem" onClick={() => setModal(true)} />
          <li>
            <label>
              {follow?.followers?.length > 1 ? 'Followers' : 'Follower'}
            </label>
            <span>{follow?.followers?.length}</span>
          </li>
          <li>
            <label>
              {follow?.followings?.length > 1 ? 'Following' : 'Followings'}
            </label>
            <span>{follow?.followings?.length}</span>
          </li>
        </FollowCounts>

        <Counts
          counts={{
            posts: counts.posts,
            boards: counts.boards,
            reviews: counts.reviews,
          }}
          user={{ ID: userInfo?.id!, username: userInfo?.username! }}
        />
      </Box>

      {setting && <ModalBtn setSetting={setSetting} />}
      {modal && (
        <Modal>
          <Svg type="close" onClick={() => setModal(false)} size="2rem" />
          <UserFollow follow={follow} setModal={setModal} />
        </Modal>
      )}
    </>
  );
};
const Modal = styled(SmallModal)`
  width: 80vw;
  height: 80vh;
  justify-content: flex-start;
  > article {
    border: none;
  }
  > .close {
    top: 20px;
    right: 20px;
  }
  .user-follow {
    width: 100%;
    height: 100%;
    margin-top: 10px;
    .follower,
    .following {
      .num {
        span {
          font-style: normal;
        }
      }
    }
  }
`;
const Box = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .flex {
    gap: 50px;
    display: flex;
    position: relative;
    .setting {
      top: 0;
      right: 0;
      position: absolute;
    }
  }
`;
const FollowCounts = styled.div`
  gap: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  li {
    gap: 10px;
    display: flex;
    align-items: center;
    label {
      font-weight: 500;
      font-size: 1.1rem;
    }
    span {
      font-size: 1.3rem;
      color: ${(p) => p.theme.color.logo};
    }
  }
`;
