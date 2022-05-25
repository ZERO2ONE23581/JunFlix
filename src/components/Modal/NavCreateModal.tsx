import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AnchorBtn } from '../Layout/parts/Header';
import { NavCont, NavWrapper } from './NavModal';

interface INavModalProps {
  loggedInUserId?: number;
}
export const NavCreateModal = ({ loggedInUserId }: INavModalProps) => {
  //
  return (
    <>
      <NavCont>
        <NavWrapper>
          <Link href={`/user/${loggedInUserId}/board/create`}>
            <a>
              <li>
                <span>Board</span>
              </li>
            </a>
          </Link>
          <Link href={`/board/select`}>
            <a>
              <li>
                <span>Post</span>
              </li>
            </a>
          </Link>
          <Link href={`/review/create`}>
            <a>
              <li>
                <span>Review</span>
              </li>
            </a>
          </Link>
        </NavWrapper>
      </NavCont>
    </>
  );
};
