import useSWR from 'swr';
import type { NextPage } from 'next';
import { Review, User } from '@prisma/client';
import styled from '@emotion/styled';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { H1, PageCont } from '../../../../styles/components/default';

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
  console.log(allRatings);
  //
  return (
    <PageCont>
      {ok && allRatings && (
        <>
          {allRatings.map((rating) => (
            <OneLine key={rating.id}>
              <article className="layer">
                <article className="flex">
                  <Order>
                    #{allRatings.length - allRatings.indexOf(rating)}
                  </Order>
                  <Title>{rating.movieTitle.toUpperCase()}</Title>
                </article>
              </article>
              <article className="layer2">
                <article className="flex">
                  <Stars>
                    {[1, 2, 3, 4, 5].map((score) => (
                      <span key={score}>
                        {rating.score! >= score ? (
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
                  <ThumsUp>
                    {rating.recommend ? (
                      <span className="yes">'추천해요!'</span>
                    ) : (
                      <span className="no">'비추해요!'</span>
                    )}
                  </ThumsUp>
                  <MovieOneLine>"{rating.oneline}"</MovieOneLine>
                  <User> - {rating.user.username}</User>
                </article>
              </article>
            </OneLine>
          ))}
        </>
      )}
    </PageCont>
  );
};
export default rating;

const Title = styled.h1`
  font-weight: 700;
`;

const ThumsUp = styled.div`
  margin-right: 30px;
  font-weight: 600;
  font-style: italic;
  .yes {
    color: blue;
  }
  .no {
    color: red;
  }
`;

const OneLine = styled.article`
  /* width: 80%; */
  margin: 10px auto;
  padding: 20px 80px;
  gap: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border-radius: 8px;
  color: black;
  background-color: #ffeaa7;
  .layer,
  .layer2 {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .flex {
      display: flex;
      align-items: center;
      gap: 15px;
    }
  }
  .layer {
    .flex {
      font-size: 1.3rem;
    }
  }
  .layer2 {
    padding-left: 50px;
  }
`;

const MovieOneLine = styled.span`
  text-decoration: underline;
  text-underline-offset: 5px;
  font-size: 1.2rem;
  font-weight: 600;
  font-style: italic;
`;
const User = styled.span`
  font-style: italic;
`;

const Stars = styled.span`
  font-size: 1.4rem;
`;
const Order = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: white;
  border-radius: 100%;
  background-color: black;
`;

const RatingPage = styled.article`
  width: 100%;
  padding: 20px 100px;
  border-radius: 8px;
  border: ${(p) => p.theme.border};
  color: ${(p) => p.theme.color.font};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background-color: ${(p) => p.theme.color.bg};
`;