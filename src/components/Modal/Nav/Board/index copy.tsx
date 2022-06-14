import styled from '@emotion/styled';
import Link from 'next/link';
import { NavCont, NavWrapper } from '../profile';
import useUser from '../../../../libs/client/useUser';
import { INavModalProps } from '../../../Layout/Header/nav/tab/detail';

export const NavBoardModal = ({ onClick }: INavModalProps) => {
  const { isLoggedIn, loggedInUser } = useUser();
  return (
    <NavCont>
      <NavWrapper>
        <Link href={`/all/boards`}>
          <a>
            <li>
              <span>All Boards</span>
            </li>
          </a>
        </Link>
        {isLoggedIn && (
          <Link href={`/my/boards`}>
            <a>
              <li>
                <span>My Boards</span>
              </li>
            </a>
          </Link>
        )}
        {isLoggedIn ? (
          <Link href={`/user/${loggedInUser?.id}/board/create`}>
            <a>
              <li>
                <span>Create</span>
              </li>
            </a>
          </Link>
        ) : (
          <li onClick={onClick}>
            <span>Create</span>
          </li>
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
