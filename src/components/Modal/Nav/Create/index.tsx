import styled from '@emotion/styled';
import Link from 'next/link';
import { NavCont, NavWrapper } from '..';

export interface INavModalProps {
  handleClick: any;
  isloggedIn?: boolean;
  loggedInUserId?: number;
}
export const NavCreateModal = ({
  handleClick,
  isloggedIn,
  loggedInUserId,
}: INavModalProps) => {
  return (
    <NavCont>
      <NavWrapper>
        {isloggedIn ? (
          <Link href={`/user/${loggedInUserId}/board/create`}>
            <a>
              <li>
                <span>Board</span>
              </li>
            </a>
          </Link>
        ) : (
          <MustLoginBtn onClick={handleClick}>Board</MustLoginBtn>
        )}
        {isloggedIn ? (
          <Link href={`/user/${loggedInUserId}/board/my-boards/select`}>
            <a>
              <li>
                <span>Posts</span>
              </li>
            </a>
          </Link>
        ) : (
          <MustLoginBtn onClick={handleClick}>Posts</MustLoginBtn>
        )}
        {isloggedIn ? (
          <Link href={`/user/${loggedInUserId}/review/create`}>
            <a>
              <li>
                <span>Review</span>
              </li>
            </a>
          </Link>
        ) : (
          <MustLoginBtn onClick={handleClick}>Review</MustLoginBtn>
        )}
      </NavWrapper>
    </NavCont>
  );
};
export const MustLoginBtn = styled.button`
  padding: 5px 0;
  font-weight: 700;
  width: 100%;
  height: 30px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: inherit;
  color: ${(p) => p.theme.color.font};
  font-size: 1rem;
  &:hover {
    color: ${(p) => p.theme.color.logo};
    background-color: ${(p) => p.theme.color.font};
  }
`;
