import { IPage } from '../_app';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../../styles/global';
import { Head_ } from '../../src/Tools/Title/Head';
import { PageTitle } from '../../src/Tools/Title/Page';
import { Movies } from '../../src/components/Movie';

const AllMovies: NextPage<IPage> = ({ theme, setFixed }) => {
  const array = ['trending', 'upcoming', 'tv', 'now', 'top'];
  return (
    <>
      <Head_ title="영화" />
      <Cont>
        <PageTitle theme={theme} type="movie" />
        {array.map((type) => (
          <Movies key={array.indexOf(type)} _data={{ theme, setFixed, type }} />
        ))}
      </Cont>
    </>
  );
};
export default AllMovies;

const Cont = styled(Page)`
  padding: 0 3rem;
  .page-title {
    margin-left: 8rem;
    margin-bottom: 2rem;
  }
`;
