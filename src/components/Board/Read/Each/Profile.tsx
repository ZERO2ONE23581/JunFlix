import styled from '@emotion/styled';
import { Svg } from '../../../Tools/Svg';
import { ProfileAvatar } from '../../../Avatar/ProfileAvatar';

interface IProfile {
  isMyBoard: boolean;
  userAvatar: string;
  username: string;
}

export const Profile = ({ isMyBoard, userAvatar, username }: IProfile) => {
  return (
    <Cont>
      {isMyBoard && <Svg type="isOwner" size="1.2rem" fill="#2ecc71" />}
      <ProfileAvatar avatar={userAvatar} size={'7em'} />
      <span>@{username}</span>
    </Cont>
  );
};
const Cont = styled.article`
  position: relative;
  gap: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  .isOwner {
    top: 0;
    left: -10%;
    position: absolute;
    svg {
      width: 20px;
      height: 20px;
      fill: #2ecc71;
    }
  }
`;
