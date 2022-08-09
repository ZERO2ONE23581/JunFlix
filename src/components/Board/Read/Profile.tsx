import styled from '@emotion/styled';
import { Svg } from '../../Tools/Svg';
import { ProfileAvatar } from '../../Avatar/Profile';
import useUser from '../../../libs/client/useUser';
import { useRouter } from 'next/router';

interface IProfile {
  username: string;
  userAvatar: string;
}
export const Profile = ({ userAvatar, username }: IProfile) => {
  const router = useRouter();
  const { user_id } = router.query;
  const { loggedInUser } = useUser();
  const isMyBoard = Boolean(loggedInUser?.id === Number(user_id));
  return (
    <Cont>
      <div className="profile-wrap">
        {isMyBoard && <Svg type="isOwner" size="1.3rem" fill="#2ecc71" />}
        <ProfileAvatar
          size="150px"
          avatar={userAvatar}
          onClick={() => router.push(`/user/${user_id}/${username}/dashboard`)}
        />
      </div>
      <span className="username">
        <span>@{username}</span>
        {!isMyBoard && (
          <span>
            <Svg type="user-plus" size="1.5rem" />
          </span>
        )}
      </span>
    </Cont>
  );
};
const Cont = styled.article`
  gap: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  .profile-wrap {
    position: relative;
    .isOwner {
      top: -10px;
      left: 0;
      position: absolute;
    }
    .profile-avatar {
      cursor: pointer;
      position: relative;
    }
  }
  .username {
    gap: 10px;
    display: flex;
    align-items: center;
    span {
      font-size: 1.2rem;
    }
  }
`;
