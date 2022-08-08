import Link from 'next/link';
import styled from '@emotion/styled';

export const LoginLink = () => {
  return (
    <Cont>
      <span>* 이미 회원입니까?</span>
      <span>Already a member?</span>
      <span>&rarr;</span>
      <Link href="/login">
        <a>로그인</a>
      </Link>
    </Cont>
  );
};
const Cont = styled.article`
  margin-top: 20px;
  span {
    font-size: 1rem;
    margin-right: 5px;
    font-style: italic;
  }
  :hover {
    a {
      color: ${(p) => p.theme.color.logo};
    }
  }
`;
