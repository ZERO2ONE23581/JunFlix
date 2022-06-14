import Link from 'next/link';
import { NavCont, NavWrapper } from '../profile';
import {
  INavModalProps,
  MustLoginBtn,
} from '../../../Layout/Header/nav/tab/detail';

export const NavReviewModal = ({
  handleClick,
  isLoggedIn,
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
        {isLoggedIn && (
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
        {isLoggedIn ? (
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
