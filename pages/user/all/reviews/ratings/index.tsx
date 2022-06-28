import useSWR from 'swr';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Review, User } from '@prisma/client';
import { Page } from '../../../../../styles/global';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProfileAvatar } from '../../../../../src/components/Avatar/Profile';

interface IGetRatings {
  ok: boolean;
  error?: string;
  ratings?: RatingWithUser[];
}
interface RatingWithUser extends Review {
  user: User;
}

const rating: NextPage = () => {
  const { data } = useSWR<IGetRatings>(`/api/user/all/reviews/ratings`);
  return (
    <Page>
      <h1>All Ratings</h1>
      {data && data.ok && data.ratings && (
        <>
          {data.ratings.map((info) => (
            <OneLine key={info.id}>
              <ProfileAvatar url={info.user.avatar} />
              <article className="layer">
                <article className="flex">
                  <Order>
                    #{data.ratings!.length - data.ratings!.indexOf(info)}
                  </Order>
                  <Title>{info.movieTitle.toUpperCase()}</Title>
                </article>
              </article>
              <article className="layer2">
                <article className="flex">
                  <Stars>
                    {[1, 2, 3, 4, 5].map((score) => (
                      <span key={score}>
                        {info.score! >= score ? (
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
                    {info.recommend ? (
                      <span className="yes">'추천해요!'</span>
                    ) : (
                      <span className="no">'비추해요!'</span>
                    )}
                  </ThumsUp>
                  <MovieOneLine>"{info.oneline}"</MovieOneLine>
                  <User> - {info.user.username}</User>
                </article>
              </article>
            </OneLine>
          ))}
        </>
      )}
    </Page>
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
