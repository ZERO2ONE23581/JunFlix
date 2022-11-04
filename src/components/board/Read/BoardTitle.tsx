import { Svg } from '../../../Tools/Svg';
import { Movie } from '../../../Tools/Title/movie';
import { Ropes } from '../../../Tools/Title/ropes';
import styled from '@emotion/styled';
import { GenreIcons } from '../../../Tools/GenreIcons';
import { ITheme } from '../../../../styles/theme';
import { FlexCol } from '../../../../styles/global';
import { useUser } from '../../../libs/client/useUser';
import { useCapLetter, useCapLetters } from '../../../libs/client/useTools';

interface IBoardPageHeading extends ITheme {
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
export const PageHeading = ({ detail, type, theme }: IBoardPageHeading) => {
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
      <FlexCol className="wrap">
        <Ropes theme={theme} />
        <div className="head">
          {isAllBoards && (
            <>
              <span>All Boards</span>
              <Svg theme={theme} type="board" />
            </>
          )}
          {isMyBoards && (
            <>
              <span>{useCapLetter(loggedInUser?.username!)}'s Boards</span>
              <Svg theme={theme} type="board" />
            </>
          )}
          {isGenreBoards && (
            <>
              <span>{useCapLetters(GenreBoardTitle()!)} Boards</span>
              <Svg type={boardGenre!} theme={theme} />
            </>
          )}
          <Movie type={type!} />
        </div>
      </FlexCol>
    </Cont>
  );
};
const Cont = styled(FlexCol)`
  width: fit-content;
  pointer-events: none;
  .wrap {
    position: relative;
    justify-content: center;
    .head {
      gap: 10px;
      display: flex;
      align-items: center;
      padding: 10px;
      font-size: 1.8rem;
      text-align: center;
      border-radius: 5px;
      border: 4px solid ${(p) => p.theme.color.logo};
    }
  }
`;
