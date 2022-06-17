import useSWR from 'swr';
import Link from 'next/link';
import styled from '@emotion/styled';
import { IGetLikes } from '../../../types/likes';
import { IGetReviews } from '../../../types/review';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CF_BASE, CF_VAR } from '../Avatar/BackgroundAvatar';
import { ProfileAvatar } from '../Avatar/ProfileAvatar';
import { LikeCommentWrap } from '../../Style/Icon/LikeCommentWrap';

interface IReviewListProps {
  isAllReviews?: boolean;
  isMyReview?: boolean;
  findLikes?: boolean;
}
export const ReviewList = ({
  isAllReviews,
  isMyReview,
  findLikes,
}: IReviewListProps) => {
  const { data } = useSWR<IGetReviews>(
    isAllReviews ? `/api/all/reviews` : isMyReview ? `/api/my/reviews` : null
  );
  const { data: LikeData } = useSWR<IGetLikes>(findLikes && `/api/my/likes`);
  const reviews = data?.reviews;
  const likes = LikeData?.reviewLikes;
  return (
    <>
      <h1>{isAllReviews ? 'All Reviews' : isMyReview ? 'My Reviews' : null}</h1>
      {reviews?.map((review) => (
        <Cont key={review.id} BgUrl={`${CF_BASE}/${review.avatar}/${CF_VAR}`}>
          <Item>
            <Link href={`/user/${review.UserID}/review/${review.id}`}>
              <a>
                <Order>#{reviews.length - reviews.indexOf(review)}</Order>
                <ProfileAvatar url={review?.user?.avatar} size={60} />
                <Wrap>
                  <Title>{review.title}</Title>
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
              </a>
            </Link>
            <LikeCommentWrap
              type="review"
              userId={review.UserID}
              reviewId={review.id}
            />
          </Item>
        </Cont>
      ))}
      {likes?.map((like) => (
        <Cont
          key={like.id}
          BgUrl={`${CF_BASE}/${like.review.avatar}/${CF_VAR}`}
        >
          <Link href={`/user/${like.review.UserID}/review/${like.review.id}`}>
            <a>
              <Item>
                <Order>#{likes.length - likes.indexOf(like)}</Order>
                <ProfileAvatar size={60} url={like?.review.user?.avatar} />
                <Wrap>
                  <Title>{like.review.title}</Title>
                  <Items>
                    <ul>
                      <li>
                        <span>{like.review.movieTitle}</span>
                        <span> / </span>
                      </li>
                      <li>
                        <span>{like.review.genre}</span>
                        <span> / </span>
                      </li>
                      <li>
                        <span>작성자: </span>
                        <span>{like.review.user?.username}</span>
                      </li>
                    </ul>
                    <Stars>
                      {[1, 2, 3, 4, 5].map((score) => (
                        <span key={score}>
                          {like.review.score! >= score ? (
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
            type="like"
            userId={like.review.UserID}
            likeId={like.review.id}
          />
        </Cont>
      ))}
    </>
  );
};
const Cont = styled.article<{ BgUrl: string | null | undefined }>`
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 5px;
  border: ${(p) => p.theme.border};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background: ${(p) => p.BgUrl && `url(${p.BgUrl})  no-repeat center / cover`};
`;
const Item = styled.article`
  padding: 10px;
  border-radius: 5px;
  box-shadow: ${(p) => p.theme.boxShadow.input};
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
  a {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const Stars = styled.span`
  font-size: 0.8rem;
`;
const Order = styled.span`
  width: 40px;
  height: 40px;
  font-size: 0.8rem;
  border-radius: 50%;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(p) => p.theme.color.bg};
  background-color: ${(p) => p.theme.color.font};
`;

const Title = styled.h2`
  font-size: 1.3rem;
  font-weight: 700;
`;
const Wrap = styled.div`
  width: 100%;
  padding: 0 15px;
  border: 1px solid red;
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
