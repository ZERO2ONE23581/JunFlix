import useSWR from 'swr';
import type { NextPage } from 'next';
import { Review, User } from '@prisma/client';
import styled from '@emotion/styled';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

interface IGetAllRatings {
  ok: boolean;
  error?: string;
  allRatings?: RatingWithUser[];
}
interface RatingWithUser extends Review {
  user: User;
}

const rating: NextPage = () => {
  const { data: rating } = useSWR<IGetAllRatings>(
    `/api/review/rating/all_ratings`
  );
  const ok = rating?.ok;
  const allRatings = rating?.allRatings;
  //
  return (
    <>
      {ok && allRatings && (
        <ReviewList>
          {allRatings.map((rating) => (
            <RatingArticle>
              <Order>#{allRatings.length - allRatings.indexOf(rating)}</Order>
              <Wrap>
                <ReviewTitle>{rating.oneline}</ReviewTitle>
                <Items>
                  <ul>
                    <li>
                      <span>{rating.movieTitle}</span>
                      <span> / </span>
                    </li>
                    <li>
                      <span>작성자: </span>
                      <span>{rating.user.username}</span>
                    </li>
                  </ul>
                  <Stars>
                    {[1, 2, 3, 4, 5].map((score) => (
                      <span key={score}>
                        {rating.score! >= score ? (
                          <FontAwesomeIcon
                            key={score}
                            icon={faStar}
                            style={{ color: 'red' }}
                          />
                        ) : (
                          <FontAwesomeIcon key={score} icon={faStar} />
                        )}
                      </span>
                    ))}
                  </Stars>
                </Items>
              </Wrap>
            </RatingArticle>
          ))}
        </ReviewList>
      )}
    </>
  );
};
export default rating;
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

const RatingArticle = styled.article`
  gap: 5px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  border: ${(p) => p.theme.border};
  color: ${(p) => p.theme.color.font};
  box-shadow: ${(p) => p.theme.boxShadow.input};
  background-color: ${(p) => p.theme.color.bg};
`;

const ReviewList = styled.article`
  width: 100%;
  padding: 20px;
  border-radius: 8px;
  border: ${(p) => p.theme.border};
  color: ${(p) => p.theme.color.font};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background-color: ${(p) => p.theme.color.bg};
`;
const ReviewTitle = styled.h1`
  font-size: 1.3rem;
  font-weight: 500;
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
