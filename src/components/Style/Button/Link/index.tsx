import Link from 'next/link';
import styled from '@emotion/styled';

interface ILinkWrap {
  isJoin?: boolean;
  isLogin?: boolean;
}

export const LinkWrap = ({ isJoin, isLogin }: ILinkWrap) => {
  return (
    <Cont>
      {isJoin && (
        <nav>
          <span className="question">이미 회원이십니까?</span>
          <span>&rarr;</span>
          <Link href="/user/login">
            <a>로그인</a>
          </Link>
        </nav>
      )}
      {isLogin && (
        <nav>
          <Link href="/user/login/find/user_id">
            <a>아이디 찾기</a>
          </Link>
          <span>|</span>
          <Link href="/user/login/find/password">
            <a>비밀번호 찾기</a>
          </Link>
          <span>|</span>
          <Link href="/user/join">
            <a>회원가입</a>
          </Link>
        </nav>
      )}
    </Cont>
  );
};
const Cont = styled.article`
  padding: 15px;
  margin-top: 15px;
  font-weight: 500;
  font-size: 1.1rem;
  border-radius: 5px;
  color: ${(p) => p.theme.color.bg};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background-color: ${(p) => p.theme.color.btn};
  nav {
    gap: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    .question {
      font-style: italic;
    }
  }
  a {
    &:hover {
      color: ${(p) => p.theme.color.logo};
    }
  }
`;