import Link from 'next/link';
import { NavCont, NavWrapper } from '..';

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
          <Link href={`/watch/all/board`}>
            <a>
              <li>
                <span>All Boards</span>
              </li>
            </a>
          </Link>
          {isloggedIn && (
            <Link href={`/watch/my/board`}>
              <a>
                <li>
                  <span>My Boards</span>
                </li>
              </a>
            </Link>
          )}
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
