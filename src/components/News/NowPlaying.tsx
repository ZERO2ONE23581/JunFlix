import useSWR from 'swr';
import styled from '@emotion/styled';

export const NowPlaying = () => {
  const { data: news } = useSWR<any>(`/api/news/now_playing`);
  const movies = news?.nowPlaying?.results;
  return (
    <Cont>
      <h1>NOW PLAYING</h1>
      <Grid>
        {movies &&
          movies.map((movie: object | any) => (
            <Item key={movie.id}>
              <MovieInfo>
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  // src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt="영화포스터"
                />
                <InfoList>
                  <li>
                    <h2>{movie.original_title}</h2>
                  </li>
                  <li>
                    <span>Rating: </span>
                    <Rating>{movie.vote_average}</Rating>
                  </li>
                  <li>
                    <span>Overview: </span>
                    <p>{movie.overview}</p>
                  </li>
                </InfoList>
              </MovieInfo>
            </Item>
          ))}
      </Grid>
    </Cont>
  );
};
const Rating = styled.span`
  color: ${(p) => p.theme.color.logo};
`;
const InfoList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 7px;
  li {
    h2 {
      text-align: center;
      font-size: 1rem;
      font-weight: 600;
    }
    span {
      font-size: 0.9rem;
      font-weight: 500;
    }
    p {
      margin-top: 7px;
      opacity: 0.6;
    }
  }
`;
const Grid = styled.article`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
`;
const MovieInfo = styled.div`
  img {
    width: 100%;
    height: 200px;
  }
`;
const Item = styled.article`
  padding: 20px;
  border: ${(p) => p.theme.border};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
`;
const Cont = styled.section`
  padding: 20px 60px;
  border: ${(p) => p.theme.border};
  color: ${(p) => p.theme.color.font};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background-color: ${(p) => p.theme.color.bg};
  h1 {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 12px;
  }
`;
