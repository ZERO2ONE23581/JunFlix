import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AnchorBtn } from '../Layout/parts/Header';
import { NavCont, NavWrapper } from './NavModal';

interface INavModalProps {
  loggedInUserId?: number;
}
export const NavReviewModal = ({ loggedInUserId }: INavModalProps) => {
  //
  return (
    <>
      <NavCont>
        <NavWrapper>
          <Link href={`/review`}>
            <a>
              <li>
                <span>All Reviews</span>
              </li>
            </a>
          </Link>
          <Link href={`/review/rating`}>
            <a>
              <li>
                <span>Rating</span>
              </li>
            </a>
          </Link>
          <Link href={`/review/create`}>
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
