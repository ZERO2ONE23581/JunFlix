import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NavCont, NavWrapper } from './NavModal';

interface INavModalProps {
  loggedInUserId?: number;
}
export const NavPostModal = ({ loggedInUserId }: INavModalProps) => {
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
