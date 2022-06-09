import { Btn } from '../Button';
import Link from 'next/link';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { User } from '@prisma/client';
import { ReviewWithUser } from '../../types/review';
import { H1 } from '../../../styles/default';
import { LikeCommentWrap } from '../Icon/LikeCommentWrap';
import useAvatar from '../../libs/client/useAvatar';
import { AvatarLogo } from '../../../styles/image';

interface IReviewListProps {
  allReviews?: boolean;
  myReview?: boolean;
  loggedInUser?: User;
  reviews?: ReviewWithUser[] | undefined;
}
export const ReviewList = ({
  myReview,
  allReviews,
  loggedInUser,
  reviews,
}: IReviewListProps) => {
  const router = useRouter();
  //
  return (
    <Cont>
      {allReviews && <H1>ALL REVIEWS</H1>}
      {myReview && <H1>MY REVIEWS</H1>}
      <Btn
        type="create"
        btnName="리뷰 작성하기"
        onClick={() => {
          loggedInUser
            ? router.push(`/user/${loggedInUser.id}/review/create`)
            : alert(`로그인이 필요합니다.`);
        }}
      />
      <List>
        {reviews?.map((review) => (
          <Desc key={review.id}>
            <Link href={`/user/${review.UserID}/review/${review.id}`}>
              <a>
                <Item>
                  <Order>#{reviews.length - reviews.indexOf(review)}</Order>
                  <AvatarLogo>
                    {review?.user.avatar ? (
                      <img
                        src={`${useAvatar(review?.user.avatar)}`}
                        alt="프로필 이미지"
                      />
                    ) : (
                      <img src="/img/profile.svg" alt="프로필 이미지" />
                    )}
                  </AvatarLogo>
                  <Wrap>
                    <ReviewTitle>{review.title}</ReviewTitle>
                    <Items>
                      <ul>
                        <li>
                          <span>{review.movieTitle}</span>
                          <span> / </span>
                        </li>
                        <li>
                          <span>{review.genre}</span>
                          <span> / </span>
                        </li>
                        <li>
                          <span>작성자: </span>
                          <span>{review.user.username}</span>
                        </li>
                      </ul>
                      <Stars>
                        {[1, 2, 3, 4, 5].map((score) => (
                          <span key={score}>
                            {review.score! >= score ? (
                              <FontAwesomeIcon
                                icon={faStar}
                                style={{ color: 'red' }}
                              />
                            ) : (
                              <FontAwesomeIcon icon={faStar} />
                            )}
                          </span>
                        ))}
                      </Stars>
                    </Items>
                  </Wrap>
                </Item>
              </a>
            </Link>
            <LikeCommentWrap
              type="review"
              userId={review.UserID}
              reviewId={review.id}
            />
          </Desc>
        ))}
      </List>
    </Cont>
  );
};
const Cont = styled.section``;
const Desc = styled.article`
  padding: 20px;
  margin-bottom: 20px;
  border: ${(p) => p.theme.border};
  color: ${(p) => p.theme.color.font};
  box-shadow: ${(p) => p.theme.boxShadow.input};
  background-color: ${(p) => p.theme.color.bg};
  border: 5px solid hotpink;
`;

const Stars = styled.span`
  font-size: 0.8rem;
`;

const Order = styled.span`
  padding: 8px;
  font-size: 0.8rem;
  border-radius: 100%;
  color: ${(p) => p.theme.color.bg};
  background-color: ${(p) => p.theme.color.font};
`;

const Item = styled.article`
  gap: 5px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 15px;
`;

const List = styled.article`
  width: 100%;
  padding: 20px 30px;
  border-radius: 8px;
  border: ${(p) => p.theme.border};
  color: ${(p) => p.theme.color.font};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background-color: ${(p) => p.theme.color.bg};
`;
const ReviewTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 700;
`;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 0 15px;
`;
const Items = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ul {
    gap: 5px;
    display: flex;
    align-items: center;
    li {
      span {
        font-size: 1rem;
        font-style: italic;
        color: ${(p) => p.theme.color.logo};
      }
    }
  }
`;
