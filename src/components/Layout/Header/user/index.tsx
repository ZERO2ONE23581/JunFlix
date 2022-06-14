import Link from 'next/link';
import styled from '@emotion/styled';
import useUser from '../../../../libs/client/useUser';
import { ProfileAvatar } from '../../../Avatar/profile';
import { NavProfileModal } from '../../../Modal/Nav/profile';

interface IUserNav {
  openProfile: boolean;
  setOpenProfile: any;
  theme: any;
  themeClick: any;
}

export const UserNav = ({ openProfile, setOpenProfile }: IUserNav) => {
  const { isLoggedIn, loggedInUser } = useUser();
  return (
    <Cont>
      {!isLoggedIn ? (
        <nav>
          <Link href="/join">
            <a>
              <span className="hover">Join</span>
            </a>
          </Link>
          <Link href="/login">
            <a>
              <span className="hover">Login</span>
            </a>
          </Link>
        </nav>
      ) : (
        <article onClick={() => setOpenProfile((p: boolean) => !p)}>
          <ProfileAvatar url={loggedInUser?.avatar} />
        </article>
      )}
      {openProfile && (
        <NavProfileModal closeModal={() => setOpenProfile(false)} />
      )}
    </Cont>
  );
};
const Cont = styled.section`
  position: relative;
  nav {
    a {
      margin-left: 40px;
      font-weight: 700;
      font-size: 1.2rem;
      text-underline-offset: 8px;
      &:hover {
        color: ${(p) => p.theme.color.logo};
      }
    }
  }
`;
