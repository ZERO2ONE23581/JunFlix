import Link from 'next/link';
import styled from '@emotion/styled';

export const ProfileNavDetail = ({ user, setOpen }: any) => {
  return (
    <Cont onClick={() => setOpen(false)}>
      <NavList>
        <Link href="/user/my/profile/page">
          <a>
            <li>{user?.username}'s page</li>
          </a>
        </Link>
        <Link href="/user/my/profile/edit">
          <a>
            <li>Edit Profile</li>
          </a>
        </Link>
        <Link href="/api/user/logout">
          <a>
            <li>Log Out</li>
          </a>
        </Link>
      </NavList>
    </Cont>
  );
};
const Cont = styled.article`
  top: 110%;
  right: -50%;
  width: 150px;
  z-index: 999;
  position: absolute;
  border-radius: 5px;
  padding-bottom: 3px;
  background-color: ${(p) => p.theme.color.bg};
  nav {
    padding: 5px 0;
    border-radius: 5px;
    box-shadow: ${(p) => p.theme.boxShadow.nav};
  }
`;
const NavList = styled.ul`
  padding: 5px 0;
  li {
    font-size: 1rem;
    padding: 5px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      color: ${(p) => p.theme.color.logo};
      background-color: ${(p) => p.theme.color.font};
    }
  }
`;
