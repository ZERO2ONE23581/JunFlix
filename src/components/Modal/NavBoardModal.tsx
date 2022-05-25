import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AnchorBtn } from '../Layout/parts/Header';
import { NavCont, NavWrapper } from './NavModal';

interface INavModalProps {
  loggedInUserId?: number;
}
export const NavBoardModal = ({ loggedInUserId }: INavModalProps) => {
  //
  return (
    <>
      <NavCont>
        <NavWrapper>
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
