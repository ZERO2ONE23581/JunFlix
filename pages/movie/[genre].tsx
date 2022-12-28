import { IPage } from '../_app';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { BG, Page } from '../../styles/global';
import { Head_ } from '../../src/Tools/Title/Head';
import { PageTitle } from '../../src/Tools/Title/Page';
import { Movies } from '../../src/components/Movie';
import { useResponsive } from '../../src/libs/client/useTools';

const GenreMovies: NextPage<IPage> = ({ theme }) => {
  const router = useRouter();
  const type = router.query.genre!;
  const { isDesk } = useResponsive();
  return (
    <>
      <Head_ title="영화" />
      <Cont isDesk={isDesk}>
        <PageTitle theme={theme} type={type} />
        <Movies _data={{ theme, type, hideTitle: true }} />
      </Cont>
    </>
  );
};
export default GenreMovies;

const Cont = styled(BG)`
  padding: 0 3rem;
  overflow-y: auto;
  //min-height: fit-content;
  padding: ${(p) => (p.isDesk ? '0rem' : '0 3rem')};
  //min-height: 200vh;
  //min-height: ${(p) => (p.isDesk ? '100%' : '100%')};
  .page-title {
    margin-bottom: 2rem;
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
