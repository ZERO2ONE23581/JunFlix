import styled from '@emotion/styled';
import { BoardWithUser } from '../../../types/board';
import { FollowBoardBtn } from '../Follow/FollowBoardBtn';

interface IBoardListInfoProps {
  board?: BoardWithUser;
}
export const ListInfo = ({ board }: IBoardListInfoProps) => {
  return (
    <Cont>
      <List>
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
      </List>
      <FollowBoardBtn USERID={board?.UserID!} BOARDID={board?.id!} />
    </Cont>
  );
};
const Cont = styled.article`
  color: white;
  position: relative;
  svg {
    left: 4%;
    top: -210%;
    position: absolute;
  }
  .follow-btn {
    top: 45%;
    right: 15%;
    position: absolute;
  }
`;
const List = styled.ul`
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
