import styled from '@emotion/styled';
import useUser from '../../../libs/client/useUser';
import { Svg } from '../../Style/Svg/Svg';
import { FollowBoardBtn } from '../Follow/FollowBoardBtn';

interface IIsOwner {
  BOARDID: number;
  BOARD_USERID: number;
}
export const IsOwner = ({ BOARDID, BOARD_USERID }: IIsOwner) => {
  const { loggedInUser } = useUser();
  const isBoardOwner = Boolean(loggedInUser?.id === BOARD_USERID);
  return (
    <Cont>
      {isBoardOwner ? (
        <Svg type="isOwner" />
      ) : (
        <FollowBoardBtn USERID={BOARD_USERID} BOARDID={BOARDID} />
      )}
    </Cont>
  );
};
const Cont = styled.div`
  top: -10%;
  left: -20%;
  position: absolute;
  .isOwner {
    svg {
      fill: #2ecc71;
    }
  }
`;
