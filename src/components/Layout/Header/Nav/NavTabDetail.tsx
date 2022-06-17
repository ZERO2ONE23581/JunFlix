import Link from 'next/link';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import useUser from '../../../../libs/client/useUser';

export const NavTabDetail = ({ title, type, setType }: any) => {
  const { isLoggedIn, loggedInUser } = useUser();
  const router = useRouter();
  const needLogin = () => {
    setType('x');
    alert('로그인이 필요합니다.');
    router.push('/user/login');
  };
  return (
    <Cont movie={title === 'Movie'}>
      {title !== 'Movie' ? (
        <NavList>
          <Link href={`/user/all/${type}s`}>
            <a>
              <li onClick={() => setType('x')}>
                <span>All </span>
                <span className="title">{title}</span>
              </li>
            </a>
          </Link>
          {type === 'review' && (
            <Link href={`/user/all/${type}s/ratings`}>
              <a>
                <li onClick={() => setType('x')}>
                  <span>All </span>
                  <span className="title">Ratings</span>
                </li>
              </a>
            </Link>
          )}

          {isLoggedIn && (
            <Link href={`/user/my/${type}`}>
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
              <Link href={`/user/my/board/select`}>
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
              <li onClick={() => setType('x')}>
                <span>All</span>
              </li>
            </a>
          </Link>
          <Link href={`/movie/trends`}>
            <a>
              <li onClick={() => setType('x')}>
                <span>Trends</span>
              </li>
            </a>
          </Link>
          <Link href={`/movie/now-playing`}>
            <a>
              <li onClick={() => setType('x')}>
                <span>Now Playing</span>
              </li>
            </a>
          </Link>
          <Link href={`/movie/tv-shows`}>
            <a>
              <li onClick={() => setType('x')}>
                <span>Tv Shows</span>
              </li>
            </a>
          </Link>
          <Link href={`/movie/upcoming`}>
            <a>
              <li onClick={() => setType('x')}>
                <span>Upcoming</span>
              </li>
            </a>
          </Link>
          <Link href={`/movie/top-rated`}>
            <a>
              <li onClick={() => setType('x')}>
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
