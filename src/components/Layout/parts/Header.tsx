import styled from '@emotion/styled';
import { User } from '@prisma/client';
import Link from 'next/link';
import useSWR from 'swr';

export interface IUser {
  ok: boolean;
  loggedInUser?: User;
}

export const Header = () => {
  const { data } = useSWR<IUser>(`/api/user/login`);
  const username = data?.loggedInUser?.username;
  //
  return (
    <Cont>
      <Nav>
        <Link href="/">
          <a>Home(로고)</a>
        </Link>
        {data?.ok ? (
          <div className="mypage">
            <Link href="/mypage">
              <a>{username}'s page</a>
            </Link>
          </div>
        ) : (
          <>
            <div className="unloggedIn">
              <Link href="/join">
                <a>Join</a>
              </Link>
              <Link href="/login">
                <a>Login</a>
              </Link>
            </div>
          </>
        )}
      </Nav>
    </Cont>
  );
};
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  .unloggedIn,
  .mypage {
    border: 1px solid white;
    width: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
const Cont = styled.section`
  background-color: black;
  padding: 20px;
  color: white;
`;
