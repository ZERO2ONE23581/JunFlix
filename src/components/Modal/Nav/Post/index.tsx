import Link from 'next/link';
import { INavModalProps, MustLoginBtn } from '../Board';
import { NavCont, NavWrapper } from '..';

export const NavPostModal = ({
  handleClick,
  isloggedIn,
  loggedInUserId,
}: INavModalProps) => {
  return (
    <NavCont>
      <NavWrapper>
        <Link href={`/all/posts`}>
          <a>
            <li>
              <span>All Posts</span>
            </li>
          </a>
        </Link>
        {isloggedIn && (
          <Link href={`/user/${loggedInUserId}/post/my-posts`}>
            <a>
              <li>
                <span>My Posts</span>
              </li>
            </a>
          </Link>
        )}
        {isloggedIn ? (
          <Link href={`/user/${loggedInUserId}/board/my-boards/select`}>
            <a>
              <li>
                <span>Create</span>
              </li>
            </a>
          </Link>
        ) : (
          <MustLoginBtn onClick={handleClick}>Create</MustLoginBtn>
        )}
      </NavWrapper>
    </NavCont>
  );
};
