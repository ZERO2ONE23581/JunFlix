import Link from 'next/link';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { IGetReviews } from '../../types/review';
import { LikeCommentWrap } from '../Icon/LikeCommentWrap';
import { Avatar } from '../Avatar';
import useSWR from 'swr';
import { IGetLikes } from '../../types/likes';

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
      {reviews?.map((review) => (
        <Desc key={review.id}>
          <Link href={`/user/${review.UserID}/review/${review.id}`}>
            <a>
              <Item>
                <Order>#{reviews.length - reviews.indexOf(review)}</Order>
                <Avatar
                  isAvatar={Boolean(review?.user.avatar)}
                  url={review?.user?.avatar}
                  size={60}
                />
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
      {likes?.map((like) => (
        <Desc key={like.id}>
          <Link href={`/user/${like.review.UserID}/review/${like.review.id}`}>
            <a>
              <Item>
                <Order>#{likes.length - likes.indexOf(like)}</Order>
                <Avatar
                  isAvatar={Boolean(like?.review.user?.avatar)}
                  url={like?.review.user?.avatar}
                  size={60}
                />
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
        </Desc>
      ))}
    </>
  );
};
const Desc = styled.article`
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: ${(p) => p.theme.border};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
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

const Title = styled.h2`
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
