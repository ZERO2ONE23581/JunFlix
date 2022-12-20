import { IPage } from '../_app';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Page } from '../../styles/global';
import { Head_ } from '../../src/Tools/Title/Head';
import { PageTitle } from '../../src/Tools/Title/Page';
import { Slider } from '../../src/components/Movie/Slider';

const GenreMovie: NextPage<IPage> = ({ theme, setFixed }) => {
  const router = useRouter();
  const type = router.query.genre!;
  return (
    <>
      <Head_ title="영화" />
      <Cont>
        <PageTitle theme={theme} type={type} />
        <Slider _data={{ theme, setFixed, type, hideTitle: true }} />
      </Cont>
    </>
  );
};
export default GenreMovie;

const Cont = styled(Page)`
  padding: 0 3rem;
  .page-title {
    margin-left: 8rem;
    margin-bottom: 2rem;
  }
`;
