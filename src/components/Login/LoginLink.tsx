import styled from '@emotion/styled';
import Link from 'next/link';
import { Article } from '../../../styles/components/default';

export const LoginLink = ({ findId, findPassword, join, joined }: any) => {
  return (
    <>
      {!joined ? (
        <Nav as={'nav'}>
          {!findId && (
            <Link href="/user/login/find_id">
              <a>아이디 찾기</a>
            </Link>
          )}
          {!findPassword && (
            <Link href="/user/login/find_pw">
              <a>비밀번호 찾기</a>
            </Link>
          )}
          {!join && (
            <Link href="/user/join">
              <a>회원가입</a>
            </Link>
          )}
        </Nav>
      ) : (
        <AlreadyJoined>
          <span>이미 회원이십니까? &rarr; </span>
          <Link href="/user/login">
            <a>로그인</a>
          </Link>
        </AlreadyJoined>
      )}
    </>
  );
};
const Nav = styled(Article)`
  gap: 20px;
  padding: 12px 20px;
  font-size: 0.7rem;
  width: 330px;
  a {
    &:hover {
      color: ${(p) => p.theme.color.logo};
    }
  }
`;
const AlreadyJoined = styled(Nav)`
  span {
    color: ${(p) => p.theme.color.logo};
    font-style: italic;
  }
`;
