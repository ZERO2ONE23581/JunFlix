import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AnchorBtn } from '../Layout/parts/Header';
import { NavWrapper } from './NavModal';

interface INavModalProps {
  loggedInUserId?: number;
}
export const NavMovieModal = ({ loggedInUserId }: INavModalProps) => {
  //
  return (
    <>
      <NavCont>
        <NavWrapper>
          <Link href={`/movie/info`}>
            <a>
              <li>
                <span>All</span>
              </li>
            </a>
          </Link>
          <Link href={`/movie/info`}>
            <a>
              <li>
                <span>Trends</span>
              </li>
            </a>
          </Link>
          <Link href={`/movie/info`}>
            <a>
              <li>
                <span>Now Playing</span>
              </li>
            </a>
          </Link>
          <Link href={`/movie/info`}>
            <a>
              <li>
                <span>Tv Shows</span>
              </li>
            </a>
          </Link>
          <Link href={`/movie/info`}>
            <a>
              <li>
                <span>Upcoming</span>
              </li>
            </a>
          </Link>
          <Link href={`/movie/info`}>
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
