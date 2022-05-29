import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import useUser from '../../libs/client/useUser';

export const NavModal = ({ closeModal }: any) => {
  const router = useRouter();
  const { isloggedIn, loggedInUser } = useUser();
  const handleClick = (type: any) => {
    closeModal();
    if (isloggedIn && loggedInUser) {
      if (type === 'my-page') {
        router.push(`/user/${loggedInUser.id}/mypage`);
      }
      if (type === 'edit-profile') {
        router.push(`/user/${loggedInUser.id}/edit/profile`);
      }
      if (type === 'logout') {
        router.push(`/api/user/logout`);
      }
    }
  };
  //
  return (
    <>
      {isloggedIn && loggedInUser && (
        <AvatarNavCont>
          <AvatarNavWrapper>
            <NavBtn onClick={() => handleClick('my-page')}>
              {loggedInUser.username}'s page
            </NavBtn>
            <NavBtn onClick={() => handleClick('edit-profile')}>
              Edit Profile
            </NavBtn>
            <NavBtn onClick={() => handleClick('logout')}>Sign Out</NavBtn>
          </AvatarNavWrapper>
        </AvatarNavCont>
      )}
    </>
  );
};

const NavBtn = styled.button`
  width: 100%;
  height: 30px;
  border: none;
  background-color: inherit;
  &:hover {
    color: ${(p) => p.theme.color.logo};
    background-color: ${(p) => p.theme.color.font};
  }
`;
const AvatarNavWrapper = styled.ul`
  padding: 5px 0;
  border-radius: 5px;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
`;
export const NavWrapper = styled.ul`
  padding: 5px 0;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  a {
    padding: 5px 0;
    li {
      width: 100%;
      height: 30px;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
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
  top: 40px;
  right: -30px;
  width: 130px;
  z-index: 999;
  position: absolute;
  border-radius: 5px;
  padding-bottom: 3px;
  background-color: ${(p) => p.theme.color.bg};
`;
const AvatarNavCont = styled(NavCont)`
  top: 52px;
  right: 100px;
  width: 130px;
  z-index: 999;
  position: absolute;
  border-radius: 5px;
  padding-bottom: 3px;
  background-color: ${(p) => p.theme.color.bg};
`;
