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
        <Slider pageType="movie" sliderType="movie" sliderDetail="trending" />
        <Slider pageType="movie" sliderType="movie" sliderDetail="upcoming" />
        <Slider pageType="movie" sliderType="movie" sliderDetail="tv" />
        <Slider pageType="movie" sliderType="movie" sliderDetail="now" />
        <Slider pageType="movie" sliderType="movie" sliderDetail="top" />
      </Cont>
    </>
  );
};
export default Movies;

export const MoviePage = styled(Page)`
  padding-top: 8%;
  .slider {
    margin-bottom: 30px;
    .title {
      padding-left: 50px;
    }
    .flex {
      gap: 5px;
      .left-chevron,
      .right-chevron {
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
