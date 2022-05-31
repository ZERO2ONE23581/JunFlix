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
import useAvatar from '../../../libs/client/useAvatar';
import { NavReviewModal } from '../../Modal/Nav/Review';
import { NavModalClose } from '../../../../styles/modal';
import { useRouter } from 'next/router';

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
            <AnchorBtn onClick={() => setOpenMovie((p) => !p)}>
              <span className="hover">Movies</span>
              {openMovie && <NavMovieModal />}
            </AnchorBtn>
            <AnchorBtn onClick={() => setOpenBoard((p) => !p)}>
              <span className="hover">Board</span>
              {openBoard && (
                <NavBoardModal
                  handleClick={needLoginClick}
                  isloggedIn={isloggedIn}
                  loggedInUserId={loggedInUser?.id}
                />
              )}
            </AnchorBtn>
            <AnchorBtn onClick={() => setOpenPost((p) => !p)}>
              <span className="hover">Post</span>
              {openPost && (
                <NavPostModal
                  handleClick={needLoginClick}
                  isloggedIn={isloggedIn}
                  loggedInUserId={loggedInUser?.id}
                />
              )}
            </AnchorBtn>
            <AnchorBtn onClick={() => setOpenReview((p) => !p)}>
              <span className="hover">Review</span>
              {openReview && (
                <NavReviewModal
                  handleClick={needLoginClick}
                  isloggedIn={isloggedIn}
                  loggedInUserId={loggedInUser?.id}
                />
              )}
            </AnchorBtn>
            <AnchorBtn onClick={() => setOpenCreate((p) => !p)}>
              <span className="hover">Create</span>
              {openCreate && (
                <NavCreateModal
                  handleClick={needLoginClick}
                  isloggedIn={isloggedIn}
                  loggedInUserId={loggedInUser?.id}
                />
              )}
            </AnchorBtn>
          </LinkStyle>
        </MainNav>
        <MyNav>
          {openProfile && <NavModal closeModal={() => setOpenProfile(false)} />}
          {isloggedIn ? (
            <Avatar onClick={() => setOpenProfile((p) => !p)}>
              {loggedInUser?.avatar ? (
                <img
                  src={`${useAvatar(loggedInUser?.avatar)}`}
                  alt="프로필 이미지"
                />
              ) : (
                <img src="/img/profile.svg" alt="프로필 이미지" />
              )}
            </Avatar>
          ) : (
            <UnloggedIn>
              <LinkStyle>
                <Link href="/user/join">
                  <a>
                    <span className="hover">Join</span>
                  </a>
                </Link>
                <Link href="/user/login">
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
export const AnchorBtn = styled.div`
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
