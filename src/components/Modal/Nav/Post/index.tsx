import Link from 'next/link';
import { INavModalProps } from '../Board';
import { NavCont, NavWrapper } from '..';

export const NavPostModal = ({
  isloggedIn,
  loggedInUserId,
}: INavModalProps) => {
  return (
    <NavCont>
      <NavWrapper>
        <Link href={`/watch/all/post`}>
          <a>
            <li>
              <span>All Posts</span>
            </li>
          </a>
        </Link>
        {isloggedIn && (
          <Link href={`/user/${loggedInUserId}/post/my_posts`}>
            <a>
              <li>
                <span>My Posts</span>
              </li>
            </a>
          </Link>
        )}
        <Link href={`/user/${loggedInUserId}/board/my_board/`}>
          <a>
            <li>
              <span>Create</span>
            </li>
          </a>
        </Link>
      </NavWrapper>
    </NavCont>
  );
};
