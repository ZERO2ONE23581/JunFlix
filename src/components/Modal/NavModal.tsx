import Link from 'next/link';
import styled from '@emotion/styled';
import useUser from '../../libs/client/useUser';

export const NavModal = () => {
  const { isloggedIn, loggedInUser, loggedInUserId } = useUser();
  //
  return (
    <>
      {isloggedIn && loggedInUser && (
        <NavCont>
          <NavWrapper>
            <Link href={`/user/${loggedInUserId}/mypage`}>
              <a>
                <li>
                  <span>{loggedInUser.username}'s page</span>
                </li>
              </a>
            </Link>
            <Link href={`/user/${loggedInUser.id}/edit/profile`}>
              <a>
                <li>
                  <span>Edit Profile</span>
                </li>
              </a>
            </Link>
            <Link href={`/api/user/logout`}>
              <a>
                <li>
                  <span>Sign Out</span>
                </li>
              </a>
            </Link>
          </NavWrapper>
        </NavCont>
      )}
    </>
  );
};

export const NavWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  a {
    width: 100%;
    padding: 5px 0;
    li {
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${(p) => p.theme.color.font};
      background-color: ${(p) => p.theme.color.bg};
      &:hover {
        color: ${(p) => p.theme.color.logo};
        background-color: ${(p) => p.theme.color.font};
      }
      span {
        font-size: 1rem;
      }
    }
  }
`;

export const NavCont = styled.nav`
  z-index: 999;
  top: 50px;
  right: -40px;
  position: absolute;
  width: 130px;
  border-radius: 5px;
  padding-bottom: 3px;
  background-color: ${(p) => p.theme.color.bg};
`;
