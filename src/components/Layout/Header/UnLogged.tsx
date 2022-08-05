import Link from 'next/link';
import styled from '@emotion/styled';

export const UnLoggedIn = () => {
  return (
    <Cont>
      <Link href="/join">
        <a>
          <span>Join</span>
        </a>
      </Link>
      <Link href="/login">
        <a>
          <span>Login</span>
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
    span {
      :hover {
        color: ${(p) => p.theme.color.logo};
      }
    }
  }
`;
