import Link from 'next/link';
import { Stars } from './Stars';
import styled from '@emotion/styled';
import { Svg } from '../../Style/Svg/Svg';
import { ListWrap, TopLayer } from './TopLayer';
import { ProfileAvatar } from '../../Avatar/Profile';
import { ReviewWithUser } from '../../../types/review';
import { CapFirstLetter, ComputeDate } from '../../Tools';
import { Counts } from '../../Style/Icon/Counts';

interface IReviewList {
  reviews: ReviewWithUser[];
}
export const ReviewList = ({ reviews }: IReviewList) => {
  const Order = (item: ReviewWithUser) => {
    return reviews.length - reviews.indexOf(item);
  };
  return (
    <Cont>
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
            <ProfileAvatar url={review?.user?.avatar} size={'1.8em'} />
            {review.user.username}
          </li>
          <li className="likes">
            <Counts isLikes LikesCounts={review?._count?.likes} />
          </li>
          <li className="comments">
            <Counts isComment CommentCounts={review?._count?.comments} />
          </li>
          <li className="date created-at">
            <span>{ComputeDate(review.createdAt.toString())}</span>
          </li>
          <li className="date updated-at">
            <span>{ComputeDate(review.updatedAt.toString())}</span>
          </li>
        </Lists>
      ))}
    </Cont>
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
  .date {
    span {
      opacity: 0.8;
      font-style: italic;
    }
  }
`;

const Title = styled.li`
  :hover {
    color: ${(p) => p.theme.color.logo};
    text-decoration: underline;
    text-underline-offset: 4px;
  }
`;
