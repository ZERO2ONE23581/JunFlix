import Link from 'next/link';
import { NavCont, NavWrapper } from '..';
import { INavModalProps, MustLoginBtn } from '../Board';

export const NavReviewModal = ({
  handleClick,
  isloggedIn,
  loggedInUserId,
}: INavModalProps) => {
  return (
    <NavCont>
      <NavWrapper>
        <Link href={`/all/reviews`}>
          <a>
            <li>
              <span>All Reviews</span>
            </li>
          </a>
        </Link>
        {isloggedIn && (
          <Link href={`/my/reviews`}>
            <a>
              <li>
                <span>My Reviews</span>
              </li>
            </a>
          </Link>
        )}
        <Link href={`/all/reviews/ratings`}>
          <a>
            <li>
              <span>Rating</span>
            </li>
          </a>
        </Link>
        {isloggedIn ? (
          <Link href={`/user/${loggedInUserId}/review/create`}>
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
