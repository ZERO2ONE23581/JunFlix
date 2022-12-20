import styled from '@emotion/styled';
import { Flex } from '../../../../../../../styles/global';

interface IMovieInfo {
  date: string;
  rate: number;
}
export const MovieInfo = ({ date, rate }: IMovieInfo) => {
  const Date = date ? date : '-';
  const Rate = rate ? Math.round(rate! * 100) / 100 : '-';
  return (
    <Cont>
      <Txt className="date">
        <span>Date:</span>
        <span className="data">{Date}</span>
      </Txt>
      <Txt>
        <span>Rate:</span>
        <span className="data">{Rate}</span>
      </Txt>
    </Cont>
  );
};
const Cont = styled(Flex)`
  gap: 0.5rem;
  padding: 0.5rem;
`;
const Txt = styled(Flex)`
  gap: 0.2rem;
  width: fit-content;
  align-items: flex-end;
  .data {
    font-size: 0.9rem;
    color: ${(p) => p.theme.color.logo};
  }
`;
