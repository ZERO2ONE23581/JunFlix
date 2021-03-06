import Link from 'next/link';
import styled from '@emotion/styled';

export const UnLoggedIn = () => {
  return (
    <Cont>
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
    </Cont>
  );
};
const Cont = styled.nav`
  gap: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  a {
    &:hover {
      color: ${(p) => p.theme.color.logo};
    }
  }
`;
