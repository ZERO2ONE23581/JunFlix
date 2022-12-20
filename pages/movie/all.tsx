import { IPage } from '../_app';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../../styles/global';
import { Slider } from '../../src/components/Movie/Slider';
import { Head_ } from '../../src/Tools/Title/Head';
import { PageTitle } from '../../src/Tools/Title/Page';

const Movies: NextPage<IPage> = ({ theme, setFixed }) => {
  const array = ['trending', 'upcoming', 'tv', 'now', 'top'];
  return (
    <>
      <Head_ title="영화" />
      <Cont>
        <PageTitle theme={theme} type="movie" />
        {array.map((type) => (
          <Slider key={array.indexOf(type)} _data={{ theme, setFixed, type }} />
        ))}
      </Cont>
    </>
  );
};
export default Movies;

const Cont = styled(Page)`
  padding: 0 3rem;
  .page-title {
    margin-left: 8rem;
    margin-bottom: 2rem;
  }
`;
