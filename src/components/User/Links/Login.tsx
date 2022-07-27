import Link from 'next/link';
import styled from '@emotion/styled';

export const LoginLink = () => {
  return (
    <Cont>
      <span>* 이미 회원입니까?</span>
      <span>(Already a member?)</span>
      <span>&rarr;</span>
      <Link href="/user/login">
        <a>로그인</a>
      </Link>
    </Cont>
  );
};
const Cont = styled.article`
  font-style: italic;
  font-size: 1.1rem;
  span {
    margin-right: 5px;
  }
  a {
    font-size: 1.2rem;
  }
  :hover {
    color: ${(p) => p.theme.color.logo};
  }
`;
