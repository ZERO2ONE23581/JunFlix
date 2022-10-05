import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Page } from '../styles/global';
import { Slider } from '../src/components/Tools/Slider';
import { Welcome } from '../src/components/Home/Welcome';
import { HeadTitle } from '../src/components/Head';

const Home: NextPage = () => {
  return (
    <>
      <HeadTitle title="HOME" />
      <Cont className="home">
        <div className="movie-wrap">
          <Welcome />
          <Slider pageType="home" sliderType="movie" />
        </div>
        <div className="post-board-wrap">
          <div className="board-wrap">
            <Slider pageType="home" sliderType="board" />
          </div>
          <div className="post-wrap">
            <Slider pageType="home" sliderType="post" />
          </div>
        </div>
      </Cont>
    </>
  );
};
export default Home;

const Cont = styled(Page)`
  padding: 0;
  .movie-wrap,
  .post-board-wrap {
    gap: 40px;
    display: flex;
    margin-top: 0px;
    padding-bottom: 10%;
    flex-direction: column;
    justify-content: center;
    background: ${(p) =>
      `linear-gradient(90deg, ${p.theme.color.grey.dark},${p.theme.color.bg}, transparent), url('/img/home-bg-up.jpg') center / cover no-repeat`};
    .slider {
      margin-bottom: 50px;
      .flex {
        gap: 10px;
        .row {
          .slide {
            height: 100%;
            .box {
              width: 100%;
              height: 100%;
              .post-box {
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
    }
  }
  .movie-wrap {
    padding-bottom: 40px;
    .slider {
      .flex {
        .row {
          min-height: 10em;
        }
      }
    }
  }
  .post-board-wrap {
    padding-bottom: 10%;
    .board-wrap {
      .row {
        min-height: 15em;
      }
    }
    .post-wrap {
      .row {
        min-height: 30em;
      }
    }
  }
`;
