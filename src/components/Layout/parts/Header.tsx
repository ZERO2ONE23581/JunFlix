import Link from 'next/link';
import { useState } from 'react';
import styled from '@emotion/styled';
import { LogoSvg } from '../../Svg/Logo';
import { NavModal } from '../../Modal/NavModal';
import useUser from '../../../libs/client/loggedInUser';
import { NavModalClose } from '../../../../styles/components/modal';

export const Header = () => {
  const { loggedInUser, isloggedIn, loggedInUserId } = useUser();
  const username = loggedInUser?.username;
  const [open, setOpen] = useState(false);
  const toggleModal = () => {
    setOpen((p) => !p);
  };
  //
  return (
    <Cont>
      <NavBar>
        <LeftWrap>
          <Logo>
            <Link href="/">
              <a>
                <LogoSvg />
              </a>
            </Link>
          </Logo>
          <NavLink>
            <Link href={`/`}>
              <a>Home</a>
            </Link>
          </NavLink>
          <NavLink>
            <Link href={`/news`}>
              <a>News</a>
            </Link>
          </NavLink>
          <NavLink>
            <Link href={`/boards`}>
              <a>Boards</a>
            </Link>
          </NavLink>
          <NavLink>
            <Link href={`/review`}>
              <a>Review</a>
            </Link>
          </NavLink>
          <NavLink>
            <Link href={`/review/rating`}>
              <a>Rating</a>
            </Link>
          </NavLink>
        </LeftWrap>
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
const NavLink = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    background-color: ${(p) => p.theme.color.font};
    color: ${(p) => p.theme.color.bg};
    border-radius: 20px;
    padding: 10px 15px;
    &:hover {
      background-color: ${(p) => p.theme.color.logo};
      color: whitesmoke;
    }
  }
`;
const Logo = styled.div`
  a {
    img {
      width: 100px;
      height: 100px;
    }
  }
`;
const LeftWrap = styled.article`
  display: flex;
  justify-content: center;
  align-content: center;
  gap: 20px;
`;
const Profile = styled.article`
  width: 40px;
  height: 40px;
  position: relative;
  border-radius: 100%;
  border: ${(p) => p.theme.border};
  background: url('/img/profile.svg') center / contain no-repeat;
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
