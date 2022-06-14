import Link from 'next/link';
import { useState } from 'react';
import styled from '@emotion/styled';
import { LogoSvg } from '../../Svg/Logo';
import { NavModal } from '../../Modal/Nav';
import useUser from '../../../libs/client/useUser';
import { NavCreateModal } from '../../Modal/Nav/Create';
import { NavBoardModal } from '../../Modal/Nav/Board';
import { NavPostModal } from '../../Modal/Nav/Post';
import { NavMovieModal } from '../../Modal/Nav/Movie';
import { Btn } from '../../Button';
import { NavReviewModal } from '../../Modal/Nav/Review';
import { NavModalClose } from '../../../../styles/modal';
import { useRouter } from 'next/router';
import { ProfileAvatar } from '../../Avatar/Profile';

export const Header = ({ onClick, btnName }: any) => {
  const { isloggedIn, loggedInUser } = useUser();
  const [openProfile, setOpenProfile] = useState(false);
  const [openMovie, setOpenMovie] = useState(false);
  const [openBoard, setOpenBoard] = useState(false);
  const [openPost, setOpenPost] = useState(false);
  const [openReview, setOpenReview] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  //
  const router = useRouter();
  const needLoginClick = () => {
    alert('로그인이 필요합니다.');
    router.push(`/user/login`);
  };
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
            <MenuItem onClick={() => setOpenMovie((p) => !p)}>
              <span className="hover">Movies</span>
              {openMovie && <NavMovieModal />}
            </MenuItem>
            <MenuItem onClick={() => setOpenBoard((p) => !p)}>
              <span className="hover">Board</span>
              {openBoard && (
                <NavBoardModal
                  handleClick={needLoginClick}
                  isloggedIn={isloggedIn}
                  loggedInUserId={loggedInUser?.id}
                />
              )}
            </MenuItem>
            <MenuItem onClick={() => setOpenPost((p) => !p)}>
              <span className="hover">Post</span>
              {openPost && (
                <NavPostModal
                  handleClick={needLoginClick}
                  isloggedIn={isloggedIn}
                  loggedInUserId={loggedInUser?.id}
                />
              )}
            </MenuItem>
            <MenuItem onClick={() => setOpenReview((p) => !p)}>
              <span className="hover">Review</span>
              {openReview && (
                <NavReviewModal
                  handleClick={needLoginClick}
                  isloggedIn={isloggedIn}
                  loggedInUserId={loggedInUser?.id}
                />
              )}
            </MenuItem>
            <MenuItem onClick={() => setOpenCreate((p) => !p)}>
              <span className="hover">Create</span>
              {openCreate && (
                <NavCreateModal
                  handleClick={needLoginClick}
                  isloggedIn={isloggedIn}
                  loggedInUserId={loggedInUser?.id}
                />
              )}
            </MenuItem>
          </LinkStyle>
        </MainNav>
        <MyNav>
          {openProfile && <NavModal closeModal={() => setOpenProfile(false)} />}
          {isloggedIn && (
            <div onClick={() => setOpenProfile((p) => !p)}>
              <ProfileAvatar url={loggedInUser?.avatar} />
            </div>
          )}
          {!isloggedIn && (
            <UnloggedIn>
              <LinkStyle>
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
              </LinkStyle>
            </UnloggedIn>
          )}
          <Btn type="theme" btnName={btnName} onClick={onClick} />
        </MyNav>
      </NavBar>
      <>
        {openProfile ? (
          <NavModalClose onClick={() => setOpenProfile(false)} />
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
  position: relative;
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
export const MenuItem = styled.div`
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
  display: flex;
  align-items: center;
  gap: 40px;
  > a,
  > button {
    font-weight: 700;
    font-size: 1.2rem;
    text-underline-offset: 8px;
    .hover {
      &:hover {
        color: ${(p) => p.theme.color.logo};
        text-decoration: solid underline 3px ${(p) => p.theme.color.logo};
      }
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
const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: relative;
  border: ${(p) => p.theme.border};
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
`;

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
  padding: 15px 12%;
  margin-bottom: 5px;
  color: ${(p) => p.theme.color.font};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background-color: ${(p) => p.theme.color.bg};
`;
