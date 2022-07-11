import styled from '@emotion/styled';
import { IBoard } from '../../../../../types/board';
import { CapFirstLetters } from '../../../../Tools';

export const ListInfo = ({ board }: IBoard) => {
  return (
    <Cont>
      <List>
        <li>
          <span className="title">{CapFirstLetters(board?.title!)}</span>
        </li>
        <li>
          <span>Genre:</span>
          <span>{board?.genre}</span>
        </li>
        <li>
          <span>Host:</span>
          <span>@{board?.user.username}</span>
        </li>
      </List>
    </Cont>
  );
};
const Cont = styled.article`
  color: white;
  position: relative;
`;
const List = styled.ul`
  padding: 15px 20px;
  li {
    margin-bottom: 3px;
    padding-bottom: 4px;
    border-bottom: 1px dotted transparent;
    span {
      font-size: 1rem;
      margin-right: 5px;
    }
    .title {
      font-weight: 500;
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
