import useSWR from 'swr';
import Link from 'next/link';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { IGetAllReviews } from '../../types/review';
import { PageCont, PageSectionWide } from '../../../styles/components/default';
import { Btn } from '../Btn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export const AllMyReviews = () => {
  const router = useRouter();
  const { data: reviewData } = useSWR<IGetAllReviews>(`/api/review/my_reviews`);
  const ok = reviewData?.ok;
  const allReviews = reviewData?.allMyReviews;
  //
  return (
    <>
      <PageCont>
        <Btn
          type="create"
          btnName="리뷰 작성하기"
          onClick={() => {
            router.push(`/review/create`);
          }}
        />
        {ok && allReviews && (
          <ReviewList>
            {allReviews.map((review) => (
              <Link href={`/review/${review.id}`} key={review.id}>
                <a>
                  <Review>
                    <Order>
                      #{allReviews.length - allReviews.indexOf(review)}
                    </Order>
                    <Wrap>
                      <ReviewTitle>{review.title}</ReviewTitle>
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
                  </Review>
                </a>
              </Link>
            ))}
          </ReviewList>
        )}
      </PageCont>
    </>
  );
};

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

const Review = styled.article`
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
  padding: 20px 30px;
  border-radius: 8px;
  border: ${(p) => p.theme.border};
  color: ${(p) => p.theme.color.font};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background-color: ${(p) => p.theme.color.bg};
`;
const ReviewTitle = styled.h2`
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