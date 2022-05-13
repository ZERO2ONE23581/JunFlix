import styled from '@emotion/styled';
import Link from 'next/link';

interface INavModalProps {
  username?: string;
}

export const NavModal = ({ username }: INavModalProps) => {
  return (
    <>
      <Cont>
        <ul>
          <li>
            <Link href="/mypage">
              <a>{username}'s page</a>
            </Link>
          </li>
          <li>
            <Link href="/api/user/logout">
              <a>Log out</a>
            </Link>
          </li>
        </ul>
      </Cont>
    </>
  );
};
const Cont = styled.nav`
  z-index: 999;
  position: absolute;
  top: 50px;
  right: -20px;
  //
  width: 150px;
  //
  border: 1px solid red;
  border-radius: 5px;
  padding: 5px 0;
  ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    li {
      width: 100%;
      padding: 6px 0;
      text-align: center;
      color: black;
      background-color: whitesmoke;
      &:hover {
        color: white;
        background-color: black;
      }
    }
  }
`;
