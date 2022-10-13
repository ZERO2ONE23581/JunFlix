import Link from 'next/link';
import { Stars } from './list_stars';
import { Icons } from './list_icons';
import styled from '@emotion/styled';
import { ListWrap, Layer } from './list_layer';
import { useCapLetter } from '../../../libs/client/useTools';
import { IReviewList } from '../../../types/review';
import { ReviewModel } from '../../../types/post';
import { Svg } from '../../../Tools/Svg';
import { Avatar } from '../../../Tools/Avatar';
import { ReadDate } from '../../../Tools/Date';
import { NoData } from '../../../Tools/NoData';

export const ReviewList = ({ reviews, isLikesType, theme }: IReviewList) => {
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
                <Link href={`/user/${review.host_id}/review/${review.id}`}>
                  <a>#{ReadTitle(review.title)}</a>
                </Link>
              </li>
              <li className="author">
                <Avatar
                  item={{
                    theme,
                    size: 'erem',
                    preview: null,
                    avatar: review?.user?.avatar!,
                  }}
                />
                <span>@{review?.user?.userId}</span>
              </li>
              <li className="movie">
                "<a>{ReadTitle(review.movie)}</a>"
              </li>
              <li className="genre">
                <span>{review.genre}</span>
                <span>
                  <Svg theme={theme} type={review.genre!} size="1.6rem" />
                </span>
              </li>
              <li className="stars">
                <Stars theme={theme} score={review.score!} />
              </li>
              <li className="recommend">
                {review.isRecommend && (
                  <Svg theme={theme} type="check-box" size="1.5rem" />
                )}
                {!review.isRecommend && (
                  <Svg theme={theme} type="empty-box" size="1.5rem" />
                )}
              </li>
              <li className="icons">
                <Icons
                  theme={theme}
                  isLike
                  CmtsCount={0}
                  likesCount={review?._count?.likes}
                />
                <Icons
                  theme={theme}
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
      {!isReview && (
        <NoData theme={theme} type={isLikesType ? 'likes-review' : 'review'} />
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
