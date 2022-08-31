import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Following } from '@prisma/client';
import { UserInfo } from './Counts/UserInfo';
import { Dispatch, SetStateAction } from 'react';
import { Blur } from '../../../../../../styles/global';
import useUser from '../../../../../libs/client/useUser';

interface IUserFollow {
  follow: {
    isFollowing: boolean;
    followers: Following[];
    followings: Following[];
  };
  setModal?: Dispatch<SetStateAction<boolean>>;
}
export const UserFollow = ({ follow, setModal }: IUserFollow) => {
  const { loggedInUser } = useUser();
  const router = useRouter();
  const { user_id } = router.query;
  const isMyPage = Boolean(loggedInUser?.id === Number(user_id));
  const isBlur = Boolean(!isMyPage && !follow.isFollowing);
  return (
    <Cont className="user-follow">
      <Lock isBlur={isBlur}>
        <span>해당 유저를 팔로우를 하면 블러가 사라집니다.</span>
        <span>Follow this user to unblur the content.</span>
      </Lock>
      <li className="follower">
        <div className="num">
          <label>
            {follow?.followers?.length! > 1 ? 'Followers' : 'Follower'}
          </label>
          <span>{follow?.followers?.length}</span>
        </div>

        <Blur isBlur={isBlur} className="array">
          {follow?.followers?.map((e) => (
            <UserInfo key={e.id} userID={e.UserID} setModal={setModal} />
          ))}
        </Blur>
      </li>

      <li className="following">
        <div className="num">
          <label>
            {follow?.followings?.length! > 1 ? 'Followings' : 'Following'}
          </label>
          <span>{follow?.followings?.length}</span>
        </div>
        <Blur isBlur={isBlur} className="array">
          {follow?.followings?.map((e) => (
            <UserInfo
              key={e.id}
              setModal={setModal}
              userID={e.FollowingUserID!}
            />
          ))}
        </Blur>
      </li>
    </Cont>
  );
};
const Cont = styled.article`
  position: relative;
  gap: 20px;
  width: 100%;
  display: flex;
  border-radius: 8px;
  padding: 15px 40px;
  border: 2px solid white;
  justify-content: space-between;
  max-height: 70vh;
  overflow-y: auto;
  box-shadow: ${(p) => p.theme.boxShadow.input};
  .follower,
  .following {
    width: 100%;
    display: flex;
    position: relative;
    align-items: center;
    flex-direction: column;
    justify-content: flex-start;
    .num {
      gap: 10px;
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      label {
        opacity: 1;
        cursor: pointer;
        font-size: 1.5rem;
        color: ${(p) => p.theme.color.logo};
      }
      span {
        cursor: pointer;
        font-size: 1.4rem;
      }
    }
  }
  .array {
    gap: 8px;
    width: 100%;
    display: flex;
    overflow-y: auto;
    flex-direction: column;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;
const Lock = styled.div<{ isBlur: boolean }>`
  top: 40%;
  gap: 5px;
  width: 100%;
  display: flex;
  padding: 20px;
  position: absolute;
  align-items: center;
  flex-direction: column;
  display: ${(p) => !p.isBlur && 'none'};
`;
