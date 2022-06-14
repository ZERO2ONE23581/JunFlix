import styled from '@emotion/styled';
import Link from 'next/link';

export const LoginLink = ({ findId, findPassword, join, joined }: any) => {
  return (
    <>
      {!joined ? (
        <Cont>
          {!findId && (
            <Link href="/user/login/find/id">
              <a>아이디 찾기</a>
            </Link>
          )}
          {!findPassword && (
            <Link href="/user/login/find/password">
              <a>비밀번호 찾기</a>
            </Link>
          )}
          {!join && (
            <Link href="/user/join">
              <a>회원가입</a>
            </Link>
          )}
        </Cont>
      ) : (
        <Cont>
          <span>이미 회원이십니까?</span>
          <span>&rarr;</span>
          <Link href="/user/login">
            <a>로그인</a>
          </Link>
        </Cont>
      )}
    </>
  );
};
const Cont = styled.nav`
  opacity: 0.8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  margin: 10px auto;
  padding: 12px 20px;
  border-radius: 5px;
  border: ${(p) => p.theme.border};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  color: ${(p) => p.theme.color.bg};
  background-color: ${(p) => p.theme.color.font};
  span {
    font-style: italic;
    margin-right: 10px;
  }
  a {
    font-size: 1rem;
    font-style: normal;
    &:hover {
      color: ${(p) => p.theme.color.logo};
    }
  }
`;
