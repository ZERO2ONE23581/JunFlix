import { Btn } from '../Button';
import Link from 'next/link';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { User } from '@prisma/client';
import { ReviewWithUser } from '../../types/review';
import { ReviewLikes } from '../Likes/review';
import { H1, PageCont } from '../../../styles/default';

interface IReviewListProps {
  isloggedIn?: boolean;
  loggedInUser?: User;
  reviews?: ReviewWithUser[] | undefined;
}
export const ReviewList = ({
  isloggedIn,
  loggedInUser,
  reviews,
}: IReviewListProps) => {
  const router = useRouter();
  //
  return (
    <PageCont>
      <H1>MY REVIEWS</H1>
      <Btn
        type="create"
        btnName="리뷰 작성하기"
        onClick={() => {
          isloggedIn
            ? router.push(`/user/${loggedInUser?.id}/review/create`)
            : alert(`로그인이 필요합니다.`);
        }}
      />
      <List>
        {reviews?.map((info) => (
          <article key={info.id}>
            <Link href={`/user/${info.UserID}/review/${info.id}`}>
              <a>
                <Item>
                  <Order>#{reviews.length - reviews.indexOf(info)}</Order>
                  <Wrap>
                    <ReviewTitle>{info.title}</ReviewTitle>
                    <Items>
                      <ul>
                        <li>
                          <span>{info.movieTitle}</span>
                          <span> / </span>
                        </li>
                        <li>
                          <span>{info.genre}</span>
                          <span> / </span>
                        </li>
                        <li>
                          <span>작성자: </span>
                          <span>{info.user.username}</span>
                        </li>
                      </ul>
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
                    </Items>
                  </Wrap>
                </Item>
              </a>
            </Link>
            <ReviewLikes userId={info.UserID} reviewId={info.id} />
          </article>
        ))}
      </List>
    </PageCont>
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

const Item = styled.article`
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

const List = styled.article`
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
