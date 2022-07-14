import styled from '@emotion/styled';
import { IBoard } from '../../../../../types/board';
import { CapFirstLetters } from '../../../../Tools';
import { Genre } from '../Board/Info/Genre';

export const ListInfo = ({ board }: IBoard) => {
  return (
    <Cont isAvatar={Boolean(board?.avatar)}>
      <Title>
        <span>{CapFirstLetters(board?.title!)}</span>
      </Title>
      <Info>
        <span>@ {board?.user.username}</span>
        <span className="dot">•</span>
        <span className="board-genre">{board?.genre}</span>
        <Genre genre={board?.genre!} size="1.4rem" />
      </Info>
    </Cont>
  );
};
const Cont = styled.ul<{ isAvatar: boolean }>`
  gap: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 1rem;
  font-style: italic;
  padding: 20px;
  color: ${(p) => (!p.isAvatar ? p.theme.color.bg : 'white')};
  :hover {
    background-color: black;
    background-color: ${(p) => p.theme.color.bg};
    color: ${(p) => p.theme.color.logo};
    svg {
      fill: ${(p) => p.theme.color.logo};
    }
    span {
      text-decoration: underline;
      text-underline-offset: 3px;
    }
    .dot {
      text-decoration: none;
    }
  }
`;
const Title = styled.li`
  font-weight: 400;
  font-size: 1.5rem;
`;
const Info = styled.li`
  gap: 7px;
  display: flex;
  align-items: center;
  svg {
    fill: white;
    margin-left: 10px;
  }
`;
