import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Welcome } from '../src/components/Home/Welcome';
import { HeadTitle } from '../src/components/Layout/Head';
import { PostSlide } from '../src/components/Tools/Slider/post';
import { MovieSlider } from '../src/components/Tools/Slider/movie';
import { BoardSlide } from '../src/components/Tools/Slider/board';

const Home: NextPage = () => {
  return (
    <>
      <HeadTitle title="HOME" />
      <Cont>
        <section className="top">
          <Welcome />
          <MovieSlider type="trending" />
        </section>
        <section className="middle">
          <PostSlide />
          <BoardSlide />
        </section>
      </Cont>
    </>
  );
};
export default Home;

const Cont = styled.section`
  gap: 30px;
  display: flex;
  padding: 0 10px 100px;
  flex-direction: column;
  justify-content: center;
  .top,
  .middle {
    padding: 0 10px;
  }
  .top {
    color: #ecf0f1;
    padding-bottom: 50px;
    background: url('/img/1.jpeg') center / cover no-repeat;
  }
  .middle {
    gap: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;
