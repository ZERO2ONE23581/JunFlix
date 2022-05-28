import Link from 'next/link';
import { INavModalProps } from './NavBoardModal';
import { NavCont, NavWrapper } from './NavModal';

export const NavReviewModal = ({
  isloggedIn,
  loggedInUserId,
}: INavModalProps) => {
  return (
    <>
      <NavCont>
        <NavWrapper>
          {isloggedIn && (
            <Link href={`/user/${loggedInUserId}/review`}>
              <a>
                <li>
                  <span>My Reviews</span>
                </li>
              </a>
            </Link>
          )}
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
