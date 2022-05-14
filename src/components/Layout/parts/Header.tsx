import styled from '@emotion/styled';
import { User } from '@prisma/client';
import Link from 'next/link';
import { useState } from 'react';
import useSWR from 'swr';
import { NavModalClose } from '../../../../styles/modal-style';
import { ILoggedInUser } from '../../../types/login';
import { NavModal } from '../../Modal/NavModal';
import { LogoSvg } from '../../Svg/Logo';

export const Header = () => {
  const { data } = useSWR<ILoggedInUser>(`/api/user/login`);
  const username = data?.loggedInUser?.username;
  const [open, setOpen] = useState(false);
  const toggleModal = () => {
    setOpen((p) => !p);
  };
  const closeModal = () => {
    setOpen(false);
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
        {data?.ok ? (
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
      {open && <NavModalClose onClick={closeModal} />}
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
const Profile = styled.button`
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
