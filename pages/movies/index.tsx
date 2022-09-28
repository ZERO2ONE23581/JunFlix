import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../../styles/global';
import { HeadTitle } from '../../src/components/Layout/Head';
import { Slider } from '../../src/components/Tools/Slider';
import { Title } from '../../src/components/Tools/Title';

const Movies: NextPage = () => {
  return (
    <>
      <HeadTitle title="영화" />
      <Cont>
        <Title type="movie-page" />
        <Slider type="movie-page" movieType="trending" />
        <Slider type="movie-page" movieType="upcoming" />
        <Slider type="movie-page" movieType="tv" />
        <Slider type="movie-page" movieType="now" />
        <Slider type="movie-page" movieType="top" />
      </Cont>
    </>
  );
};
export default Movies;

export const MoviePage = styled(Page)`
  background-color: #1e272e;
  padding-top: 15vh;
  .slider {
    margin-bottom: 30px;
    .title {
      padding-left: 50px;
    }
    .flex {
      gap: 5px;
      .chev-left-arrow,
      .chev-right-arrow {
        width: 50px;
        height: 50px;
      }
      .row {
        min-height: 200px;
        .slide {
          .box {
            .slide {
              gap: 20px;
            }
          }
        }
      }
    }
  }
`;
const Cont = styled(MoviePage)``;
