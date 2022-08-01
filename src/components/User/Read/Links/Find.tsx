import Link from 'next/link';
import styled from '@emotion/styled';

export const FindLink = () => {
  return (
    <Cont>
      <Link href="/user/find/user_id">
        <a>아이디 찾기</a>
      </Link>
      <span>|</span>
      <Link href="/user/find/password">
        <a>비밀번호 찾기</a>
      </Link>
      <span>|</span>
      <Link href="/user/join">
        <a>회원가입</a>
      </Link>
    </Cont>
  );
};
const Cont = styled.article`
  padding: 5px;
  display: flex;
  margin-top: 10px;
  border-radius: 5px;
  align-items: center;
  justify-content: space-around;
  a {
    &:hover {
      color: ${(p) => p.theme.color.logo};
    }
  }
`;
