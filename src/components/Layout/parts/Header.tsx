import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { NavModalClose } from '../../../../styles/components/modal';
import useUser from '../../../libs/client/loggedInUser';
import { ILoggedInUser } from '../../../types/login';
import { NavModal } from '../../Modal/NavModal';
import { LogoSvg } from '../../Svg/Logo';

export const Header = () => {
  const { loggedInUser, isloggedIn } = useUser();
  const username = loggedInUser?.username;

  const [open, setOpen] = useState(false);
  const toggleModal = () => {
    setOpen((p) => !p);
  };

  //
  return (
    <Cont>
      <NavBar>
        <Logo>
          <Link href="/">
            <a>
              <LogoSvg />
            </a>
          </Link>
        </Logo>
        {isloggedIn ? (
          <Profile onClick={toggleModal}>
            {open && <NavModal username={username} />}
          </Profile>
        ) : (
          <div className="unloggedIn">
            <Link href="/join">
              <a>Join</a>
            </Link>
            <Link href="/login">
              <a>Login</a>
            </Link>
          </div>
        )}
      </NavBar>
      {open && <NavModalClose onClick={() => setOpen(false)} />}
    </Cont>
  );
};
const Logo = styled.article`
  a {
    img {
      width: 100px;
      height: 100px;
    }
  }
`;
const Profile = styled.article`
  width: 40px;
  height: 40px;
  position: relative;
  border-radius: 100%;
  border: ${(p) => p.theme.border};
  background: center / contain no-repeat url('/img/profile.svg');
`;

const NavBar = styled.nav`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .unloggedIn {
    display: flex;
    align-items: center;
    gap: 30px;
    a {
    }
  }
`;
const Cont = styled.section`
  background-color: ${(p) => p.theme.color.bg};
  color: ${(p) => p.theme.color.font};
  padding: 15px 12%;
  margin-bottom: 5px;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
`;
