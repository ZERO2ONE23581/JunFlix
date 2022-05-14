import styled from '@emotion/styled';
import Link from 'next/link';

interface INavModalProps {
  username?: string;
}

export const NavModal = ({ username }: INavModalProps) => {
  return (
    <>
      <Cont>
        <Wrapper>
          <li>
            <Link href="/mypage">
              <a>{username}'s page</a>
            </Link>
          </li>
          <li>
            <Link href="/my/profile">
              <a>Edit Profile</a>
            </Link>
          </li>
          <li>
            <Link href="/api/user/logout">
              <a>Log out</a>
            </Link>
          </li>
        </Wrapper>
      </Cont>
    </>
  );
};

const Wrapper = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2px 0;
  border-radius: 5px;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  li {
    width: 100%;
    padding: 6px 0;
    text-align: center;
    background-color: ${(p) => p.theme.color.bg};
    color: ${(p) => p.theme.color.font};
    &:hover {
      background-color: ${(p) => p.theme.color.font};
      color: ${(p) => p.theme.color.bg};
    }
  }
`;

const Cont = styled.nav`
  background-color: ${(p) => p.theme.color.bg};
  color: ${(p) => p.theme.color.font};
  z-index: 999;
  position: absolute;
  top: 50px;
  right: -20px;
  width: 150px;
  border-radius: 5px;
  padding: 5px 0;
`;
