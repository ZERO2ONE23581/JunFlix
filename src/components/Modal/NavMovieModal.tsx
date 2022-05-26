import Link from 'next/link';
import styled from '@emotion/styled';
import { NavWrapper } from './NavModal';

export const NavMovieModal = () => {
  //
  return (
    <>
      <NavCont>
        <NavWrapper>
          <Link href={`/movie/all`}>
            <a>
              <li>
                <span>All</span>
              </li>
            </a>
          </Link>
          <Link href={`/movie/trends`}>
            <a>
              <li>
                <span>Trends</span>
              </li>
            </a>
          </Link>
          <Link href={`/movie/now-playing`}>
            <a>
              <li>
                <span>Now Playing</span>
              </li>
            </a>
          </Link>
          <Link href={`/movie/tv-shows`}>
            <a>
              <li>
                <span>Tv Shows</span>
              </li>
            </a>
          </Link>
          <Link href={`/movie/upcoming`}>
            <a>
              <li>
                <span>Upcoming</span>
              </li>
            </a>
          </Link>
          <Link href={`/movie/top-rated`}>
            <a>
              <li>
                <span>Top Rated</span>
              </li>
            </a>
          </Link>
        </NavWrapper>
      </NavCont>
    </>
  );
};

const NavCont = styled.nav`
  top: 40px;
  left: -40px;
  z-index: 999;
  position: absolute;
  width: 150px;
  border-radius: 5px;
  padding-bottom: 3px;
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
`;
