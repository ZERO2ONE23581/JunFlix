import Link from 'next/link';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { LogoSvg } from '../../Svg/Logo';
import { NavModal } from '../../Modal/NavModal';
import useUser from '../../../libs/client/useUser';
import { NavCreateModal } from '../../Modal/NavCreateModal';
import { NavBoardModal } from '../../Modal/NavBoardModal';
import { NavModalClose } from '../../../../styles/components/modal';
import { NavPostModal } from '../../Modal/NavPostModal';
import { NavReviewModal } from '../../Modal/NavReviewModal';
import { NavMovieModal } from '../../Modal/NavMovieModal';
import { Btn } from '../../Btn';
import useAvatar from '../../../libs/client/useAvatar';

export const Header = ({ onClick, btnName }: any) => {
  const { isloggedIn, loggedInUserId, loggedInUser } = useUser();
  const [avatarUrl, setAvatarUrl] = useState('/img/profile.svg');
  //
  const [open, setOpen] = useState(false);
  const [openMovie, setOpenMovie] = useState(false);
  const [openBoard, setOpenBoard] = useState(false);
  const [openPost, setOpenPost] = useState(false);
  const [openReview, setOpenReview] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  useEffect(() => {
    if (isloggedIn) setAvatarUrl(useAvatar(loggedInUser?.avatar));
  }, [useUser, loggedInUser]);
  //
  return (
    <Cont>
      <NavBar>
        <MainNav>
          <Logo>
            <Link href="/">
              <a>
                <LogoSvg />
              </a>
            </Link>
          </Logo>
          <LinkStyle>
            <AnchorBtn onClick={() => setOpenMovie((p) => !p)}>
              Movies
              {openMovie && <NavMovieModal />}
            </AnchorBtn>
            <AnchorBtn onClick={() => setOpenBoard((p) => !p)}>
              Board
              {openBoard && (
                <NavBoardModal
                  isloggedIn={isloggedIn}
                  loggedInUserId={loggedInUserId}
                />
              )}
            </AnchorBtn>
            <AnchorBtn onClick={() => setOpenPost((p) => !p)}>
              Post
              {openPost && (
                <NavPostModal
                  isloggedIn={isloggedIn}
                  loggedInUserId={loggedInUserId}
                />
              )}
            </AnchorBtn>
            <AnchorBtn onClick={() => setOpenReview((p) => !p)}>
              Review
              {openReview && (
                <NavReviewModal
                  isloggedIn={isloggedIn}
                  loggedInUserId={loggedInUserId}
                />
              )}
            </AnchorBtn>
            <AnchorBtn onClick={() => setOpenCreate((p) => !p)}>
              Create
              {openCreate && <NavCreateModal loggedInUserId={loggedInUserId} />}
            </AnchorBtn>
          </LinkStyle>
        </MainNav>
        <MyNav>
          {isloggedIn ? (
            <>
              <Avatar url={avatarUrl} onClick={() => setOpen((p) => !p)}>
                {open && <NavModal />}
              </Avatar>
            </>
          ) : (
            <UnloggedIn>
              <LinkStyle>
                <Link href="/user/join">
                  <a>Join</a>
                </Link>
                <Link href="/user/login">
                  <a>Login</a>
                </Link>
              </LinkStyle>
            </UnloggedIn>
          )}
          <Btn type="theme" btnName={btnName} onClick={onClick} />
        </MyNav>
      </NavBar>

      <>
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
        ) : openMovie ? (
          <NavModalClose onClick={() => setOpenMovie(false)} />
        ) : null}
      </>
    </Cont>
  );
};
const MyNav = styled.article`
  display: flex;
  align-items: center;
  gap: 50px;
`;
const MainNav = styled.article`
  width: 800px;
  gap: 50px;
  display: flex;
  align-content: center;
`;
export const AnchorBtn = styled.button`
  cursor: pointer;
  position: relative;
  background: none;
  border: none;
  font-weight: 700;
  font-size: 1.2rem;
  text-underline-offset: 8px;
`;
const LinkStyle = styled.div`
  width: 100%;
  gap: 40px;
  display: flex;
  align-items: center;
  a,
  button {
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
const Avatar = styled.div<{ url: string }>`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: ${(p) => p.theme.border};
  background: ${(p) => `url(${p.url}) center / cover no-repeat`};
  /* background: ${(p) => `url(img/profile.svg) center / cover no-repeat`}; */
`;
// const Profile = styled.article`
//   width: 40px;
//   height: 40px;
//   position: relative;
//   border-radius: 100%;
//   border: ${(p) => p.theme.border};
//   background: url('/img/profile.svg') center / contain no-repeat;
// `;

const UnloggedIn = styled.article`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const NavBar = styled.nav`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Cont = styled.section`
  background-color: ${(p) => p.theme.color.bg};
  color: ${(p) => p.theme.color.font};
  padding: 15px 12%;
  margin-bottom: 5px;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
`;
