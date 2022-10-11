import Link from 'next/link';
import { Stars } from './Stars';
import { Icons } from './Icons';
import styled from '@emotion/styled';
import { ListWrap, Layer } from './Layer';
import { Svg } from '../../../../Tools/Svg';
import { ReviewModel } from '../../../../types/post';
import { ReadDate } from '../../../../Tools/Date';
import { ProfileAvatar } from '../../../../Tools/Avatar/profile';
import { IReviewList } from '../../../../types/review';
import { Fixed } from './Fixed';
import { useCapLetter } from '../../../../libs/client/useTools';
import { NoData } from '../../../../Tools/NoData';

export const ReviewList = ({ reviews, isLikesType }: IReviewList) => {
  const Order = (item: ReviewModel) => {
    return reviews.length - reviews.indexOf(item);
  };
  const isReview = Boolean(reviews?.length > 0);
  const ReadTitle = (title: string) => {
    const num = 15;
    if (Boolean(title.length >= num))
      return useCapLetter(title.slice(0, num) + '...');
    if (Boolean(title.length < num)) return useCapLetter(title);
  };

  return (
    <>
      {isReview && (
        <Cont className="review-list">
          <Layer />
          {reviews?.map((review) => (
            <Lists key={review.id} isFirst={Boolean(Order(review) === 1)}>
              <li className="number">{Order(review)}</li>
              <li className="title">
                <Link href={`/user/${review.UserID}/review/${review.id}`}>
                  <a>#{ReadTitle(review.title)}</a>
                </Link>
              </li>
              <li className="author">
                <ProfileAvatar avatar={review?.user?.avatar} size="2rem" />
                <span>@{review?.user?.userId}</span>
              </li>
              <li className="movie">
                "<a>{ReadTitle(review.movieTitle)}</a>"
              </li>
              <li className="genre">
                <span>{review.genre}</span>
                <span>
                  <Svg type={review.genre} size="1.6rem" />
                </span>
              </li>
              <li className="stars">
                <Stars score={review.score!} />
              </li>
              <li className="recommend">
                {review.recommend && <Svg type="check-box" size="1.5rem" />}
                {!review.recommend && <Svg type="empty-box" size="1.5rem" />}
              </li>
              <li className="icons">
                <Icons
                  isLike
                  CmtsCount={0}
                  likesCount={review?._count?.likes}
                />
                <Icons
                  isCmt
                  likesCount={0}
                  CmtsCount={review?._count?.comments}
                />
              </li>
              <li className="createdAt date">
                <ReadDate updatedAt={null} createdAt={review.createdAt} />
              </li>
              <li className="updatedAt date">
                <span>
                  <ReadDate createdAt={null} updatedAt={review.updatedAt} />
                </span>
              </li>
            </Lists>
          ))}
        </Cont>
      )}
      {!isReview && <NoData type={isLikesType ? 'likes-review' : 'review'} />}
    </>
  );
};
const Cont = styled.section`
  font-size: 1rem;
  position: relative;
`;
const Lists = styled(ListWrap)<{ isFirst: boolean }>`
  border: none;
  li {
    height: 42px;
    border: 1px solid ${(p) => p.theme.color.font};
    border-bottom: none;
    border-bottom: ${(p) => p.isFirst && `1px solid ${p.theme.color.font}`};
    border-right: none;
    :last-child {
      border-right: ${(p) => `1px solid ${p.theme.color.font}`};
    }
    svg {
      pointer-events: none;
    }
  }
  .title,
  .movie {
    padding-left: 10px;
    justify-content: flex-start;
  }
  .title,
  .movie {
    font-size: 1.1rem;
  }
  .title {
    :hover {
      text-decoration: underline;
      text-underline-offset: 4px;
      color: ${(p) => p.theme.color.logo};
    }
  }
  .author {
    gap: 10px;
    font-size: 0.9rem;
  }
  .movie {
    font-style: italic;
  }
  .genre {
    justify-content: space-around;
  }
  .icons {
    gap: 20px;
  }
  .date {
    justify-content: center;
  }
`;
