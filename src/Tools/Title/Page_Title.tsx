import { Svg } from '../Svg';
import { Movie } from './movie';
import { Ropes } from './ropes';
import styled from '@emotion/styled';
import { GenreIcons } from '../GenreIcons';
import { ITheme } from '../../../styles/theme';
import useUser from '../../libs/client/useUser';
import { useCapLetter } from '../../libs/client/useTools';

interface IPage_Title extends ITheme {
  type: string;
  postType?: string;
  reviewType?: string;
  movieType?: string;
  genreBoardType?: string;
}
export const Page_Title = ({
  type,
  theme,
  postType,
  movieType,
  reviewType,
  genreBoardType,
}: IPage_Title) => {
  const { loggedInUser } = useUser();
  return (
    <Cont className="page-title">
      <Wrapper>
        <Ropes />
        <H1>
          {type === 'review' && (
            <>
              {reviewType === 'all' && (
                <>
                  <span>All Reviews</span>
                  <Svg theme={theme} type="post" size="2rem" />
                </>
              )}
              {reviewType === 'my' && (
                <>
                  <span>{loggedInUser?.username}'s Reviews</span>
                  <Svg theme={theme} type="post" size="2rem" />
                </>
              )}
            </>
          )}
          {type === 'post' && (
            <>
              {postType === 'all' && (
                <>
                  All Posts <Svg theme={theme} type="post" size="2rem" />
                </>
              )}
              {postType === 'my' && (
                <>
                  {loggedInUser?.username}'s Posts
                  <Svg theme={theme} type="post" size="2rem" />
                </>
              )}
            </>
          )}
          {type === 'movie' && (
            <>
              {movieType === 'trending' && (
                <>
                  Trending Now <Svg theme={theme} type="film" size="2rem" />
                </>
              )}
              {movieType === 'upcoming' && (
                <>
                  Upcoming <Svg theme={theme} type="film" size="2rem" />
                </>
              )}
              {movieType === 'tv' && (
                <>
                  TV Shows <Svg theme={theme} type="film" size="2rem" />
                </>
              )}
              {movieType === 'now' && (
                <>
                  Now Playing <Svg theme={theme} type="film" size="2rem" />
                </>
              )}
              {movieType === 'top' && (
                <>
                  Classics <Svg theme={theme} type="film" size="2rem" />
                </>
              )}
            </>
          )}
          {type === 'movie-page' && (
            <>
              Movie Page <Svg theme={theme} type="film" size="2rem" />
            </>
          )}
          {type === 'all-boards' && (
            <>
              All Boards <Svg theme={theme} type="board" size="2rem" />
            </>
          )}
          {type === 'my-boards' && (
            <>
              {loggedInUser?.username}'s Boards
              <Svg theme={theme} type="board" size="2rem" />
            </>
          )}
          {type === 'genre-board' && (
            <>
              {genreBoardType?.toUpperCase()} Boards
              <GenreIcons type={useCapLetter(genreBoardType!)} />
            </>
          )}
          <Movie type={type!} />
        </H1>
      </Wrapper>
    </Cont>
  );
};
const Cont = styled.article`
  padding-left: 3em;
  display: flex;
  width: fit-content;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
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
const H1 = styled.div`
  gap: 10px;
  display: flex;
  align-items: center;
  padding: 10px;
  font-size: 2rem;
  text-align: center;
  border-radius: 5px;
  border: 4px solid ${(p) => p.theme.color.logo};
`;
