import { Svg } from '../Svg';
import { Movie } from './movie';
import { Ropes } from './ropes';
import styled from '@emotion/styled';
import { GenreIcons } from '../GenreIcons';
import { ITheme } from '../../../styles/theme';
import useUser from '../../libs/client/useUser';
import { useCapLetter, useCapLetters } from '../../libs/client/useTools';

interface IPageTitle extends ITheme {
  type: string;
  detail?: {
    my?: boolean;
    all?: boolean;
    genre?: {
      type: string;
      isGenre: boolean;
    };
  };
}
export const PageTitle = ({ detail, type, theme }: IPageTitle) => {
  const { loggedInUser } = useUser();
  const isMyBoards = Boolean(type === 'board' && detail?.my);
  const isAllBoards = Boolean(type === 'board' && detail?.all);
  const boardGenre = detail?.genre?.type;
  const GenreBoardTitle = () => (boardGenre === 'sf' ? 'SF' : boardGenre);
  const isGenreBoards = Boolean(
    type === 'board' && detail?.genre?.isGenre && boardGenre
  );
  return (
    <Cont className="page-title">
      <Wrapper>
        <Ropes />
        <div className="head">
          {isAllBoards && (
            <>
              <span>All Boards</span>
              <Svg theme={theme} type="board" size="2rem" />
            </>
          )}
          {isMyBoards && (
            <>
              <span>{useCapLetter(loggedInUser?.username!)}'s Boards</span>
              <Svg theme={theme} type="board" size="2rem" />
            </>
          )}
          {isGenreBoards && (
            <>
              <span>{useCapLetters(GenreBoardTitle()!)} Boards</span>
              <GenreIcons type={useCapLetter(boardGenre!)} />
            </>
          )}
          <Movie type={type!} />
        </div>
      </Wrapper>
    </Cont>
  );
};
const Cont = styled.article`
  padding-left: 3rem;
  display: flex;
  width: fit-content;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  .head {
    gap: 10px;
    display: flex;
    align-items: center;
    padding: 10px;
    font-size: 2rem;
    text-align: center;
    border-radius: 5px;
    border: 4px solid ${(p) => p.theme.color.logo};
  }
  svg {
    pointer-events: none;
  }
`;
const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
