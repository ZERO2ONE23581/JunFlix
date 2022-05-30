import Link from 'next/link';
import { NavCont, NavWrapper } from '..';
import { INavModalProps } from '../Board';

export const NavReviewModal = ({
  isloggedIn,
  loggedInUserId,
}: INavModalProps) => {
  return (
    <NavCont>
      <NavWrapper>
        <Link href={`/watch/all/review`}>
          <a>
            <li>
              <span>All Reviews</span>
            </li>
          </a>
        </Link>
        {isloggedIn && (
          <Link href={`/watch/my/review`}>
            <a>
              <li>
                <span>My Reviews</span>
              </li>
            </a>
          </Link>
        )}
        <Link href={`/watch/all/review/rating`}>
          <a>
            <li>
              <span>Rating</span>
            </li>
          </a>
        </Link>
        <Link href={`/user/${loggedInUserId}/review/create`}>
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
