import styled from '@emotion/styled';

interface IInfo {
  item: any;
}
export const Info = ({ item }: IInfo) => {
  return (
    <Cont>
      {item.original_title && <li className="title">{item.original_title}</li>}
      {item.original_name && <li className="title">{item.original_name}</li>}
      <li>
        <span>Rating (평점): </span>
        <span className="red">{item.vote_average}</span>
      </li>
      <li>
        <span>Overview (줄거리): </span>
        <p>{item.overview}</p>
      </li>
    </Cont>
  );
};
const Cont = styled.ul`
  gap: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .title {
    margin: 10px 0;
    font-weight: 400;
    font-size: 1.1rem;
    text-align: center;
  }
  li {
    span {
      opacity: 0.9;
      font-size: 1rem;
      font-weight: 500;
      margin-right: 10px;
    }
    p {
      margin-top: 7px;
      opacity: 0.6;
    }
  }
`;
