import { Title } from '../../Tools/Title';
import styled from '@emotion/styled';

interface ITitle {
  type: string;
}
export const MovieTitle = ({ type }: ITitle) => {
  return (
    <Cont className="movie-title">
      {type === 'trending' && (
        <Title type="trending" svg={{ type: 'fire', size: '1.7rem' }} />
      )}
      {type === 'now' && (
        <Title type="now" svg={{ type: 'film', size: '1.7rem' }} />
      )}
      {type === 'upcoming' && (
        <Title type="upcoming" svg={{ type: 'film', size: '1.7rem' }} />
      )}
      {type === 'tv' && (
        <Title type="tv" svg={{ type: 'tv', size: '1.7rem' }} />
      )}
      {type === 'top' && (
        <Title type="top" svg={{ type: 'film', size: '1.7rem' }} />
      )}
    </Cont>
  );
};
const Cont = styled.h1`
  font-weight: 500;
  .eng {
    font-size: 1.5rem;
  }
  .kor {
    font-size: 1.3rem;
  }
`;
