import { IPage } from '../_app';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../../styles/global';
import { Slider } from '../../src/Tools/Slider';
import { Head_ } from '../../src/Tools/head_title';
import { PageHeading } from '../../src/components/PageHeading';
import { useRouter } from 'next/router';

const GenreMovie: NextPage<IPage> = ({ theme, setFixed }) => {
  const router = useRouter();
  const type = router.query.genre!;
  return (
    <>
      <Head_ title="영화" />
      <Cont>
        <PageHeading theme={theme} type={type} />
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
