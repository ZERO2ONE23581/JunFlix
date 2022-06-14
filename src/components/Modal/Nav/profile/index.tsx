import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import useUser from '../../../../libs/client/useUser';

export const NavProfileModal = ({ closeModal }: any) => {
  const router = useRouter();
  const { isLoggedIn, loggedInUser } = useUser();
  const handleClick = (type: any) => {
    closeModal();
    if (isLoggedIn && loggedInUser) {
      if (type === 'my-page') {
        router.push(`/my/page`);
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
      {isLoggedIn && loggedInUser && (
        <Cont>
          <AvatarNavWrapper>
            <NavBtn onClick={() => handleClick('my-page')}>
              {loggedInUser.username}'s page
            </NavBtn>
            <NavBtn onClick={() => handleClick('edit-profile')}>
              Edit Profile
            </NavBtn>
            <NavBtn onClick={() => handleClick('logout')}>Sign Out</NavBtn>
          </AvatarNavWrapper>
        </Cont>
      )}
    </>
  );
};

const Cont = styled.nav`
  top: 110%;
  right: -50%;
  width: 130px;
  z-index: 999;
  position: absolute;
  border-radius: 5px;
  padding-bottom: 3px;
  background-color: ${(p) => p.theme.color.bg};
`;

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
