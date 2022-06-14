import Link from 'next/link';
import styled from '@emotion/styled';
import useUser from '../../../../../../libs/client/useUser';
import { useRouter } from 'next/router';

export const TabDetail = ({ title, type, setType }: any) => {
  const { isLoggedIn, loggedInUser } = useUser();
  const router = useRouter();
  const needLogin = () => {
    setType('x');
    alert('로그인이 필요합니다.');
    router.push('/login');
  };
  return (
    <Cont movie={title === 'Movie'}>
      {title !== 'Movie' ? (
        <NavList>
          <Link href={`/all/${type}s`}>
            <a>
              <li onClick={() => setType('x')}>
                <span>All </span>
                <span className="title">{title}</span>
              </li>
            </a>
          </Link>
          {isLoggedIn && (
            <Link href={`/my/${type}`}>
              <a>
                <li onClick={() => setType('x')}>
                  <span>My</span>
                  <span className="title">{title}</span>
                </li>
              </a>
            </Link>
          )}
          {isLoggedIn ? (
            title === 'Post' ? (
              <Link href={`/my/board/select`}>
                <a>
                  <li onClick={() => setType('x')}>
                    <span>Create</span>
                  </li>
                </a>
              </Link>
            ) : (
              <Link href={`/user/${loggedInUser?.id}/${type}/create`}>
                <a>
                  <li onClick={() => setType('x')}>
                    <span>Create</span>
                  </li>
                </a>
              </Link>
            )
          ) : (
            <li onClick={needLogin}>
              <span>Create</span>
            </li>
          )}
        </NavList>
      ) : (
        <NavList>
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
        </NavList>
      )}
    </Cont>
  );
};
const Cont = styled.nav<{ movie: boolean | undefined }>`
  width: ${(p) => (p.movie ? '120px' : '100px')};
  left: 50%;
  top: 150%;
  transform: translate(-50%, 0);
  z-index: 999;
  position: absolute;
  border-radius: 5px;
  padding-bottom: 3px;
  background-color: ${(p) => p.theme.color.bg};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
`;
const NavList = styled.ul`
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
    .title {
      margin-left: 5px;
    }
  }
`;
