import Link from 'next/link';
import { NavCont, NavWrapper } from './NavModal';

export interface INavModalProps {
  isloggedIn?: boolean;
  loggedInUserId?: number;
}
export const NavBoardModal = ({
  isloggedIn,
  loggedInUserId,
}: INavModalProps) => {
  //
  return (
    <>
      <NavCont>
        <NavWrapper>
          {isloggedIn && (
            <Link href={`/user/${loggedInUserId}/board/my`}>
              <a>
                <li>
                  <span>My Boards</span>
                </li>
              </a>
            </Link>
          )}
          <Link href={`/board`}>
            <a>
              <li>
                <span>All Boards</span>
              </li>
            </a>
          </Link>
          <Link href={`/user/${loggedInUserId}/board/create`}>
            <a>
              <li>
                <span>Create</span>
              </li>
            </a>
          </Link>
        </NavWrapper>
      </NavCont>
    </>
  );
};
