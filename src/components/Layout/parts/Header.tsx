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
          <LinkStyle>
            <Link href={`/`}>
              <a>Home</a>
            </Link>
            <Link href={`/movie/info`}>
              <a>Movies</a>
            </Link>
            <Link href={`/boards`}>
              <a>Boards</a>
            </Link>
            <Link href={`/review`}>
              <a>Review</a>
            </Link>
            <Link href={`/review/rating`}>
              <a>Rating</a>
            </Link>
            <Link href={`/user/${loggedInUser?.id}/board/create`}>
              <a>Create</a>
            </Link>
          </LinkStyle>
        </LeftWrap>

        {isloggedIn ? (
          <Profile onClick={toggleModal}>
            {open && <NavModal username={username} />}
          </Profile>
        ) : (
          <div className="unloggedIn">
            <Link href="/user/join">
              <a>Join</a>
            </Link>
            <Link href="/user/login">
              <a>Login</a>
            </Link>
          </div>
        )}
      </NavBar>
      {open && <NavModalClose onClick={() => setOpen(false)} />}
    </Cont>
  );
};
const LeftWrap = styled.article`
  width: 800px;
  gap: 50px;
  display: flex;
  align-content: center;
`;
const LinkStyle = styled.div`
  width: 100%;
  gap: 40px;
  display: flex;
  align-items: center;
  a {
    font-weight: 700;
    font-size: 1.2rem;
    color: ${(p) => p.theme.color.font};
    text-underline-offset: 8px;
    &:hover {
      color: ${(p) => p.theme.color.logo};
      text-decoration: solid underline 3px ${(p) => p.theme.color.logo};
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
