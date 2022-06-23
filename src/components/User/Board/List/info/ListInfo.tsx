import styled from '@emotion/styled';
import { Svg } from '../../../../Style/Svg/Svg';
import { BoardWithUser } from '../../../../../types/board';
import { FollowBoardBtn } from '../../Follow/FollowBoardBtn';

interface IBoardListInfoProps {
  board?: BoardWithUser;
}
export const ListInfo = ({ board }: IBoardListInfoProps) => {
  return (
    <Cont>
      <Wrap>
        <li>
          <span className="title">{board?.title.toUpperCase()}</span>
        </li>
        <li>
          <span>Genre:</span>
          <span>{board?.genre}</span>
        </li>
        <li>
          <span>Made by </span>
          <span>{board?.user.username}</span>
        </li>
      </Wrap>
      <FollowBoardBtn USERID={board?.UserID!} BOARDID={board?.id!} />
      <div className="follow-button"></div>
      <div className="created-by-me">
        <Svg type="created-by-me" />
      </div>
    </Cont>
  );
};
const Cont = styled.article`
  color: white;
  position: relative;
  .created-by-me {
    svg {
      left: 4%;
      top: -210%;
      position: absolute;
    }
  }
  .follow-btn {
    top: 10%;
    right: 3%;
    position: absolute;
  }
`;
const Wrap = styled.ul`
  width: 100%;
  padding: 20px;
  li {
    width: 80%;
    margin-bottom: 3px;
    padding-bottom: 4px;
    border-bottom: 1px dotted transparent;
    span {
      font-size: 1rem;
      margin-right: 5px;
    }
    .title {
      font-weight: 600;
      font-size: 1.1rem;
    }
  }
  :hover {
    background-color: black;
    color: ${(p) => p.theme.color.logo};
    li {
      border-bottom: 1px dotted ${(p) => p.theme.color.logo};
    }
  }
`;
