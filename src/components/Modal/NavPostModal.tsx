import Link from 'next/link';
import { NavCont, NavWrapper } from './NavModal';

export const NavPostModal = () => {
  //
  return (
    <>
      <NavCont>
        <NavWrapper>
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
