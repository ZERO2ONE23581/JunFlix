import styled from '@emotion/styled';
import { FlexCol } from '../../../../../styles/global';

interface IMovieModalInfo {
  _data: {
    title: string;
    overview: string;
    vote_average: number;
    release_date: string;
    original_name: string;
    original_language: string;
  };
}
export const Info = ({ _data }: IMovieModalInfo) => {
  const {
    title,
    overview,
    vote_average,
    release_date,
    original_name,
    original_language,
  } = _data;
  const Overview = overview ? overview : '-';
  const lang = original_language?.toUpperCase();
  const Date = release_date ? release_date : '-';
  const Title = original_name ? original_name : title;
  const Rate = vote_average ? Math.round(vote_average * 100) / 100 : '-';
  return (
    <Cont>
      <Head>{Title}</Head>
      <Txts>
        <li>
          <span>Language (언어):</span>
          <span>{lang}</span>
        </li>
        <li>
          <span>Release Date (개봉일):</span>
          <span>{Date}</span>
        </li>
        <li>
          <span>Rate (평점):</span>
          <span>{Rate}</span>
        </li>
        <li>
          <span>Overview (줄거리):</span>
          <span className="overview">{Overview}</span>
        </li>
      </Txts>
    </Cont>
  );
};
const Cont = styled(FlexCol)`
  padding-top: 0.8rem;
`;
const Head = styled.h1`
  font-size: 2rem;
  font-weight: 400;
  text-align: center;
  width: fit-content;
`;
const Txts = styled.ul`
  padding: 20px;
  font-size: 1.2rem;
  li {
    margin-bottom: 10px;
    span {
      :first-of-type {
        margin-left: 5px;
        margin-right: 10px;
      }
      :nth-of-type(2) {
        opacity: 0.8;
        font-style: italic;
        color: ${(p) => p.theme.color.logo};
      }
    }
    .overview {
      font-size: 1.3rem;
      line-height: 28px;
    }
  }
`;
