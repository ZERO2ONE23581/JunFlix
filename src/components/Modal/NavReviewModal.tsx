import Link from 'next/link';
import { NavCont, NavWrapper } from './NavModal';

export const NavReviewModal = () => {
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
