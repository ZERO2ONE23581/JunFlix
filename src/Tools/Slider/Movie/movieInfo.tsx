import { Svg } from '../../Svg';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

interface IMovieInfo {
  date?: string;
  rate?: number;
  movieId: number;
}
export const MovieInfo = ({ date, rate, movieId }: IMovieInfo) => {
  const router = useRouter();
  return (
    <Cont>
      {date && (
        <li>
          <span>Date:</span>
          <span className="data">{date}</span>
        </li>
      )}
      {rate && (
        <li>
          <span>Rate:</span>
          <span className="data">{Math.round(rate! * 100) / 100}</span>
        </li>
      )}
      <Svg
        size="1.2rem"
        type="caret-down"
        onClick={() => router.replace(`/home/${movieId}`)}
      />
    </Cont>
  );
};
const Cont = styled.ul`
  gap: 5px;
  display: flex;
  padding: 5px 10px 0;
  align-items: center;
  justify-content: center;
  svg {
    margin-bottom: 2px;
  }
  li {
    font-size: 8px;
    .data {
      margin-left: 5px;
      color: ${(p) => p.theme.color.logo};
    }
  }
`;
