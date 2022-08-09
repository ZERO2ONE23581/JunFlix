import Link from 'next/link';
import styled from '@emotion/styled';

export const Movie = ({ setSelect }: any) => {
  return (
    <Cont>
      <Link href={`/movies`}>
        <a>
          <li onClick={() => setSelect('')}>
            <span>All</span>
          </li>
        </a>
      </Link>
      <Link href={`/movies/trending`}>
        <a>
          <li onClick={() => setSelect('')}>
            <span>Trends</span>
          </li>
        </a>
      </Link>
      <Link href={`/movies/now`}>
        <a>
          <li onClick={() => setSelect('')}>
            <span>Now Playing</span>
          </li>
        </a>
      </Link>
      <Link href={`/movies/tv`}>
        <a>
          <li onClick={() => setSelect('')}>
            <span>Tv Shows</span>
          </li>
        </a>
      </Link>
      <Link href={`/movies/upcoming`}>
        <a>
          <li onClick={() => setSelect('')}>
            <span>Upcoming</span>
          </li>
        </a>
      </Link>
      <Link href={`/movies/top`}>
        <a>
          <li onClick={() => setSelect('')}>
            <span>Top Rated</span>
          </li>
        </a>
      </Link>
    </Cont>
  );
};
const Cont = styled.ul`
  padding: 5px 0;
  li {
    font-size: 1rem;
    padding: 5px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      color: ${(p) => p.theme.color.logo};
      background-color: ${(p) => p.theme.color.font};
    }
    .type {
      margin-left: 5px;
    }
  }
`;
