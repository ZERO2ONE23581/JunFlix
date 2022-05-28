import Link from 'next/link';
import { INavModalProps } from './NavBoardModal';
import { NavCont, NavWrapper } from './NavModal';

export const NavPostModal = ({
  isloggedIn,
  loggedInUserId,
}: INavModalProps) => {
  return (
    <>
      <NavCont>
        <NavWrapper>
          {isloggedIn && (
            <Link href={`/user/${loggedInUserId}/post`}>
              <a>
                <li>
                  <span>My Posts</span>
                </li>
              </a>
            </Link>
          )}
          <Link href={`/post`}>
            <a>
              <li>
                <span>All Posts</span>
              </li>
            </a>
          </Link>
          <Link href={`/board/select`}>
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
