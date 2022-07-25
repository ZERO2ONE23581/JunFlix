import styled from '@emotion/styled';
import useUser from '../../../../../libs/client/useUser';
import { IBoard } from '../../../../../types/board';
import { ProfileAvatar } from '../../../../Avatar/ProfileAvatar';
import { Svg } from '../../../../Style/Svg/Svg';

export const Profile = ({ board }: IBoard) => {
  const { loggedInUser } = useUser();
  const isMyBoard = Boolean(loggedInUser?.id === board?.UserID);
  return (
    <Cont>
      {isMyBoard && <Svg type="isOwner" size="1.2rem" fill="#2ecc71" />}
      <ProfileAvatar avatar={board?.user?.avatar} size={'7em'} />
      <span>@{board?.user?.username}</span>
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
