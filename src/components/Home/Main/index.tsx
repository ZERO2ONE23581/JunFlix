import { Intro } from './Intro';
import styled from '@emotion/styled';
import { MovieAPI } from '../../Movie';
import { Page } from '../../../../styles/global';

export const Main = () => {
  return (
    <Cont>
      <Intro />
      <MovieAPI type="trending" />
    </Cont>
  );
};
const Cont = styled(Page)`
  padding-top: 200px;
  padding-bottom: 100px;
  color: #ecf0f1;
  background: url('/img/1.jpeg') center / cover no-repeat;
  .intro {
    margin-bottom: 100px;
  }
`;
