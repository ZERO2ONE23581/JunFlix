import { IPage } from '../_app';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { BG } from '../../styles/global';
import { Head_ } from '../../src/Tools/Title/Head';
import { Movies } from '../../src/components/Movie';
import { PageTitle } from '../../src/Tools/Title/Page';
import { useResponsive } from '../../src/libs/client/useTools';

const AllMovies: NextPage<IPage> = ({ theme }) => {
  const { isDesk } = useResponsive();
  const array = ['trending', 'upcoming', 'tv', 'now', 'top'];
  return (
    <>
      <Head_ title="영화" />
      <MoviePG isDesk={isDesk}>
        <PageTitle theme={theme} type="movie" />
        {array.map((type) => (
          <Movies key={array.indexOf(type)} _data={{ theme, type }} />
        ))}
      </MoviePG>
    </>
  );
};
export default AllMovies;

export const MoviePG = styled(BG)`
  padding: 0 3rem;
  overflow-y: auto;
  padding: ${(p) => (p.isDesk ? '0rem' : '0 3rem')};
  min-height: ${(p) => (p.isDesk ? '100vh' : '200vh')};
  //min-height: ${(p) => (p.isDesk ? '100%' : '100%')};
  .page-title {
    margin-bottom: 2rem;
    margin-left: ${(p) => p.isDesk && '5rem'};
    font-size: ${(p) => (p.isDesk ? '2rem' : '4rem')};
    svg {
      width: ${(p) => (p.isDesk ? '2rem' : '4rem')};
      height: ${(p) => (p.isDesk ? '2rem' : '4rem')};
    }
    .txt {
      padding: ${(p) => (p.isDesk ? '0.5rem 2rem' : '1rem 3rem')};
    }
  }
  .page-title {
    //margin-left: 8rem;
    //margin-bottom: 2rem;
  }
`;
