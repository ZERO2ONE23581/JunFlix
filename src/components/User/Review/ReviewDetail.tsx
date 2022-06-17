import styled from '@emotion/styled';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { ThumnailAvatar } from '../Avatar/Thumnail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ReviewDetail = ({ data }: any) => {
  return (
    <Cont>
      <h1>{data?.review?.title}</h1>
      <ul>
        <li>
          <span className="title">Movie: </span>
          <span>{data?.review?.movieTitle}</span>
        </li>
        <li>
          <span className="title">Genre: </span>
          <span>{data?.review?.genre}</span>
        </li>
        <li>
          <span className="title">별점: </span>
          {[1, 2, 3, 4, 5].map((score) => (
            <span key={score}>
              {data?.review?.score! >= score ? (
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
        </li>
        <li>
          <span className="title">한줄평: </span>
          {data?.review?.oneline && (
            <Oneline>"{data?.review?.oneline}"</Oneline>
          )}
        </li>
        <ThumnailAvatar url={data?.review?.avatar} />
        <li>
          <Content>{data?.review?.content}</Content>
        </li>
      </ul>
    </Cont>
  );
};
const Cont = styled.ul`
  margin: 20px auto;
  h1 {
    font-size: 2rem;
    font-weight: 600;
    text-align: center;
  }
  ul {
    margin: 20px auto;
    li {
      gap: 5px;
      display: flex;
      align-items: center;
      font-size: 1.2rem;
      margin-bottom: 8px;
      .title {
        font-weight: 600;
      }
    }
  }
`;
const Oneline = styled.span`
  font-style: italic;
  font-weight: 500;
`;
const Content = styled.p`
  font-size: 1.2rem;
  width: 80%;
  margin: 0 auto;
  padding: 20px 40px;
  border: ${(p) => p.theme.border};
  box-shadow: ${(p) => p.theme.boxShadow.input};
`;
