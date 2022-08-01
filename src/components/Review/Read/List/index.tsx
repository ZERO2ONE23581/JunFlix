import Link from 'next/link';
import { Stars } from './Stars';
import { Icons } from './Icons';
import styled from '@emotion/styled';
import { ListWrap, Layer } from './Layer';
import { Svg } from '../../../Tools/Svg';
import { ReviewModel } from '../../../../types/post';
import { CapFirstLetter, ReadDate } from '../../../Tools/Tools';
import { ProfileAvatar } from '../../../Avatar/ProfileAvatar';
import { IReviewList } from '../../../../types/review';
import { Fixed } from './Fixed';

export const ReviewList = ({ reviews, isMyPage }: IReviewList) => {
  const Order = (item: ReviewModel) => {
    return reviews.length - reviews.indexOf(item);
  };
  const isReview = Boolean(reviews?.length > 0);
  const ReadTitle = (title: string) => {
    if (Boolean(title.length >= 10))
      return CapFirstLetter(title.slice(0, 10) + '...');
    if (Boolean(title.length < 10)) return CapFirstLetter(title);
  };
  return (
    <>
      {!isMyPage && <Fixed />}
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
                <ReadDate
                  isList
                  UPDATEDAT={null}
                  CREATEDAT={review.createdAt}
                />
              </li>
              <li className="updatedAt date">
                <span>
                  <ReadDate
                    isList
                    CREATEDAT={null}
                    UPDATEDAT={review.updatedAt}
                  />
                </span>
              </li>
            </Lists>
          ))}
        </Cont>
      )}

      {!isReview && (
        <>
          <h1>리뷰가 존재하지 않습니다...</h1>
        </>
      )}
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
    padding-left: 15px;
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
