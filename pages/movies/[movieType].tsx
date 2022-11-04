import { MoviePage } from '.';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Title } from '../../src/Tools/box_title';
import { Slider } from '../../src/Tools/Slider';
import { Head_ } from '../../src/Tools/head_title';

const MovieTypes: NextPage<{ theme: boolean }> = ({ theme }) => {
  const router = useRouter();
  const type = router.query.movieType?.toString();
  return (
    <>
      <Head_ title="인기 콘텐츠" />
      <Cont>
        <Title type="movie" movieType={type} />
        <Slider pageType="movie" sliderDetail={type} sliderType="movie" />
      </Cont>
    </>
  );
};
export default MovieTypes;
const Cont = styled(MoviePage)`
  .slider {
    margin-bottom: 30px;
    .title {
      padding-left: 50px;
    }
    .flex {
      gap: 5px;
      .left-chev,
      .right-chev {
        width: 50px;
        height: 50px;
      }
      .row {
        min-height: 440px;
        .slide {
          .box {
            .movie-hover {
              .movie-box-unhover {
                padding: 50px 30px;
                font-size: 1.6rem;
              }
              .movie-box-hover {
                font-size: 1.6rem;
                padding: 50px 30px;
              }
            }
          }
        }
      }
    }
  }
`;
