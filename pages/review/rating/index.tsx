import useSWR from 'swr';
import type { NextPage } from 'next';
import { Review, User } from '@prisma/client';
import styled from '@emotion/styled';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { Flex } from '../../../styles/components/default';

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
        <RatingPage>
          {allRatings.map((rating) => (
            <>
              <OneLine>
                <article className="wrap">
                  <Order>
                    #{allRatings.length - allRatings.indexOf(rating)}
                  </Order>
                  <Stars>
                    {[1, 2, 3, 4, 5].map((score) => (
                      <span>
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
                  <MovieOneLine>{rating.oneline}</MovieOneLine>
                  <User> - {rating.user.username}</User>
                </article>
                <MovieTitle>{rating.movieTitle.toUpperCase()}</MovieTitle>
              </OneLine>
            </>
          ))}
        </RatingPage>
      )}
    </>
  );
};
export default rating;

const OneLine = styled.article`
  color: black;
  padding: 10px 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  background-color: aliceblue;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  .wrap {
    gap: 15px;
    display: flex;
    align-items: center;
  }
`;

const MovieOneLine = styled.span`
  font-size: 1rem;
  font-weight: 400;
`;
const User = styled.span`
  font-style: italic;
`;
const MovieTitle = styled.span`
  background-color: bisque;
  border-radius: 5px;
  padding: 20px 10px;
  width: 100px;
  height: 30px;
  font-size: 0.7rem;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Stars = styled.span`
  font-size: 1.4rem;
`;
const Order = styled.span`
  padding: 8px;
  font-size: 0.8rem;
  border-radius: 100%;
  color: white;
  background-color: black;
`;

const RatingPage = styled.article`
  width: 100%;
  padding: 20px 40px;
  border-radius: 8px;
  border: ${(p) => p.theme.border};
  color: ${(p) => p.theme.color.font};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background-color: ${(p) => p.theme.color.bg};
`;
