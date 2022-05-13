import styled from '@emotion/styled';
import { User } from '@prisma/client';
import Link from 'next/link';
import { useState } from 'react';
import useSWR from 'swr';
import { NavModalClose } from '../../../../styles/modal-style';
import { NavModal } from '../../Modal/NavModal';

export interface IUser {
  ok: boolean;
  loggedInUser?: User;
}

export const Header = () => {
  const { data } = useSWR<IUser>(`/api/user/login`);
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
      <Nav>
        <Link href="/">
          <a>Home(로고)</a>
        </Link>
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
      </Nav>
      {open && <NavModalClose onClick={closeModal} />}
    </Cont>
  );
};

const Profile = styled.button`
  width: 40px;
  height: 40px;
  position: relative;
  border-radius: 100%;
  border: 1px solid white;
  background: center / contain no-repeat url('/img/profile.svg');
`;

const Nav = styled.nav`
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
  border: 1px solid white;
`;
const Cont = styled.section`
  background-color: ${(p) => p.theme.color.bg};
  color: ${(p) => p.theme.color.font};
  padding: 10px 15%;
`;
