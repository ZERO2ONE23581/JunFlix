import Link from 'next/link';
import { NavCont, NavWrapper } from '../profile';
import useUser from '../../../../libs/client/useUser';
import { INavModalProps } from '../../../Layout/Header/nav';

export const NavPostModal = ({ onClick }: INavModalProps) => {
  const { isLoggedIn } = useUser();
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
        {isLoggedIn && (
          <Link href={`/my/posts`}>
            <a>
              <li>
                <span>My Posts</span>
              </li>
            </a>
          </Link>
        )}
        {isLoggedIn ? (
          <Link href={`/my/boards/select`}>
            <a>
              <li>
                <span>Create</span>
              </li>
            </a>
          </Link>
        ) : (
          <li>
            <span>Create</span>
          </li>
        )}
      </NavWrapper>
    </NavCont>
  );
};
