import styled from '@emotion/styled';
import { BoardWithUser } from '../../../../../types/board';

interface IBoardListInfoProps {
  board?: BoardWithUser;
}
export const BoardListInfo = ({ board }: IBoardListInfoProps) => {
  return (
    <>
      <Cont>
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
      </Cont>
    </>
  );
};
const Cont = styled.ul`
  padding: 15px 20px;
  li {
    margin-bottom: 3px;
    padding-bottom: 5px;
    border-bottom: 1px dotted ${(p) => p.theme.color.font};
    span {
      font-size: 1rem;
      margin-right: 5px;
    }
    .title {
      font-weight: 600;
      font-size: 1.1rem;
    }
  }
`;
