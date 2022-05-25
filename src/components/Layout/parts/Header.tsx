import Link from 'next/link';
import { useState } from 'react';
import styled from '@emotion/styled';
import { LogoSvg } from '../../Svg/Logo';
import { NavModal } from '../../Modal/NavModal';
import useUser from '../../../libs/client/loggedInUser';
import { NavCreateModal } from '../../Modal/NavCreateModal';
import { NavBoardModal } from '../../Modal/NavBoardModal';
import { NavModalClose } from '../../../../styles/components/modal';
import { NavPostModal } from '../../Modal/NavPostModal';
import { NavReviewModal } from '../../Modal/NavReviewModal';

export const Header = () => {
  const { loggedInUser, isloggedIn, loggedInUserId } = useUser();
  const username = loggedInUser?.username;
  const [open, setOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openBoard, setOpenBoard] = useState(false);
  const [openPost, setOpenPost] = useState(false);
  const [openReview, setOpenReview] = useState(false);
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
              <Anchor>Home</Anchor>
            </Link>
            <Link href={`/movie/info`}>
              <Anchor>Movies</Anchor>
            </Link>
            <AnchorBtn onClick={() => setOpenBoard((p) => !p)}>
              Board
              {openBoard && <NavBoardModal loggedInUserId={loggedInUserId} />}
            </AnchorBtn>
            <AnchorBtn onClick={() => setOpenPost((p) => !p)}>
              Post
              {openPost && <NavPostModal loggedInUserId={loggedInUserId} />}
            </AnchorBtn>
            <AnchorBtn onClick={() => setOpenReview((p) => !p)}>
              Review
              {openReview && <NavReviewModal loggedInUserId={loggedInUserId} />}
            </AnchorBtn>
            <Link href={`/review/rating`}>
              <Anchor>Rating</Anchor>
            </Link>
            <AnchorBtn onClick={() => setOpenCreate((p) => !p)}>
              Create
              {openCreate && <NavCreateModal loggedInUserId={loggedInUserId} />}
            </AnchorBtn>
          </LinkStyle>
        </LeftWrap>

        {isloggedIn ? (
          <Profile onClick={() => setOpen((p) => !p)}>
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
      {open ? (
        <NavModalClose onClick={() => setOpen(false)} />
      ) : openCreate ? (
        <NavModalClose onClick={() => setOpenCreate(false)} />
      ) : openBoard ? (
        <NavModalClose onClick={() => setOpenBoard(false)} />
      ) : openPost ? (
        <NavModalClose onClick={() => setOpenPost(false)} />
      ) : openReview ? (
        <NavModalClose onClick={() => setOpenReview(false)} />
      ) : null}
    </Cont>
  );
};
const LeftWrap = styled.article`
  width: 800px;
  gap: 50px;
  display: flex;
  align-content: center;
`;
export const AnchorBtn = styled.span`
  cursor: pointer;
  position: relative;
  background: none;
  border: none;
  font-weight: 700;
  font-size: 1.2rem;
  text-underline-offset: 8px;
`;
const Anchor = styled.a`
  cursor: pointer;
  font-weight: 700;
  font-size: 1.2rem;
  color: ${(p) => p.theme.color.font};
  text-underline-offset: 8px;
  &:hover {
    color: ${(p) => p.theme.color.logo};
    text-decoration: solid underline 3px ${(p) => p.theme.color.logo};
  }
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
