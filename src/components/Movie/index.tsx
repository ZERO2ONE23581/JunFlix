import useSWR from 'swr';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

interface IMovieInfoProps {
  type?: string;
}

export const MovieInfo = ({ type }: IMovieInfoProps) => {
  const [data, setData] = useState([]);
  const { data: trending } = useSWR(`/api/movie/trending`);
  const { data: nowPlaying } = useSWR(`/api/movie/now_playing`);
  const { data: tvShows } = useSWR(`/api/movie/popular_tv`);
  const { data: upcoming } = useSWR(`/api/movie/upcoming`);
  const { data: topRated } = useSWR(`/api/movie/top_rated`);

  const results =
    type === 'trending'
      ? trending?.trendingData?.results
      : type === 'nowPlaying'
      ? nowPlaying?.nowPlayingMovies?.results
      : type === 'tvShows'
      ? tvShows?.popularTvShows?.results
      : type === 'upcoming'
      ? upcoming?.upcomingMovies?.results
      : type === 'topRated'
      ? topRated?.topRatedMovies?.results
      : null;
  useEffect(() => {
    if (
      type === 'trending' ||
      type === 'nowPlaying' ||
      type === 'tvShows' ||
      type === 'upcoming' ||
      type === 'topRated'
    )
      setData(results);
  }, [trending, nowPlaying, upcoming, topRated, tvShows]);
  return (
    <>
      <h1>
        {type === 'trending' && <span>Trending</span>}
        {type === 'nowPlaying' && <span>Now Playing</span>}
        {type === 'tvShows' && <span>Tv Shows</span>}
        {type === 'upcoming' && <span>Upcoming</span>}
        {type === 'topRated' && <span>Top Rated</span>}
      </h1>
      <Grid>
        {data &&
          data
            .slice(5, 10)
            .reverse()
            .map((info: object | any) => (
              <Item key={info.id}>
                <MovieInfoWrap>
                  <img
                    src={`https://image.tmdb.org/t/p/original${info.poster_path}`}
                    alt="영화포스터1"
                  />
                  {/* <img
                    src={`https://image.tmdb.org/t/p/original${info.backdrop_path}`}
                    alt="영화포스터2"
                  /> */}
                  <InfoList>
                    {info.original_title && (
                      <li>
                        <h2>{info.original_title}</h2>
                      </li>
                    )}
                    {info.original_name && (
                      <li>
                        <h2>{info.original_name}</h2>
                      </li>
                    )}
                    <li>
                      <span>Rating: </span>
                      <Rating>{info.vote_average}</Rating>
                    </li>
                    <li>
                      <span>Overview: </span>
                      {/* <p>{movie.overview}</p> */}
                    </li>
                  </InfoList>
                </MovieInfoWrap>
              </Item>
            ))}
      </Grid>
    </>
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
const MovieInfoWrap = styled.div`
  img {
    width: 100%;
    height: 330px;
  }
`;
const Item = styled.article`
  padding: 20px;
  border: ${(p) => p.theme.border};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
`;
