import Link from 'next/link';
import { Stars } from './Stars';
import styled from '@emotion/styled';
import { IconCount } from './IconCount';
import { ListWrap, TopLayer } from './TopLayer';
import { ReviewModel } from '../../../types/post';
import { CapFirstLetter, ReadDate } from '../../Tools';
import { ProfileAvatar } from '../../Avatar/ProfileAvatar';

export interface IReviewList {
  reviews: ReviewModel[];
}
export const ReviewList = ({ reviews }: IReviewList) => {
  const Order = (item: ReviewModel) => {
    return reviews.length - reviews.indexOf(item);
  };
  return (
    <>
      {reviews?.length > 0 ? (
        <Cont className="review-list">
          <TopLayer />
          {reviews?.map((review) => (
            <Lists key={review.id}>
              <li className="number">{Order(review)}</li>
              <Title className="title">
                <Link href={`/user/${review.UserID}/review/${review.id}`}>
                  <a>{CapFirstLetter(review.title)}</a>
                </Link>
              </Title>
              <li className="movie-title">{review.movieTitle.toUpperCase()}</li>
              <li className="genre">{review.genre}</li>
              <li className="stars">
                <Stars score={review.score!} />
              </li>
              <li className="author">
                <ProfileAvatar avatar={review?.user?.avatar} size={'2em'} />
                {review?.user?.username}
              </li>
              <li className="likes">
                <IconCount
                  isLike
                  CmtsCount={0}
                  likesCount={review?._count?.likes}
                />
              </li>
              <li className="comments">
                <IconCount
                  isCmt
                  likesCount={0}
                  CmtsCount={review?._count?.comments}
                />
              </li>
              <li className="date created-at">
                <ReadDate CREATEDAT={review.createdAt} isList />
              </li>
              <li className="date updated-at">
                <span>
                  <ReadDate UPDATEDAT={review.updatedAt} isList />
                </span>
              </li>
            </Lists>
          ))}
        </Cont>
      ) : (
        <>
          <h1>리뷰가 존재하지 않습니다...</h1>
        </>
      )}
    </>
  );
};
const Cont = styled.section`
  font-size: 0.9rem;
  min-width: 1362px;
`;
const Lists = styled(ListWrap)`
  border: none;
  li {
    height: 45px;
    border: 1px solid ${(p) => p.theme.color.font};
  }
  .title {
    font-size: 1.1rem;
  }
  .number,
  .movie-title {
    font-size: 1rem;
  }
  .stars {
    div {
      gap: 1px;
      svg {
        width: 1em;
        height: 1em;
      }
    }
  }
  .likes,
  .comments {
    div {
      span {
        div {
          svg {
            width: 1.6em;
            height: 1.6em;
          }
        }
      }
    }
  }
  .created-at,
  .updated-at {
  }
`;
const Title = styled.li`
  :hover {
    text-decoration: underline;
    text-underline-offset: 4px;
    color: ${(p) => p.theme.color.logo};
  }
`;
