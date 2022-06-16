import Link from 'next/link';
import styled from '@emotion/styled';
import { ProfileNavDetail } from './ProfileNavDetail';
import useUser from '../../../../libs/client/useUser';
import { ProfileAvatar } from '../../../User/Avatar/ProfileAvatar';

export const ProfileNav = ({ open, setOpen }: any) => {
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
        <article onClick={() => setOpen((p: boolean) => !p)}>
          <ProfileAvatar url={loggedInUser?.avatar} />
        </article>
      )}
      {open && <ProfileNavDetail user={loggedInUser} setOpen={setOpen} />}
    </Cont>
  );
};
const Cont = styled.section`
  position: relative;
  nav {
    a {
      margin-left: 40px;
      font-size: 1.2rem;
      text-underline-offset: 8px;
      &:hover {
        color: ${(p) => p.theme.color.logo};
      }
    }
  }
`;
