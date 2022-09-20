import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Welcome } from '../../../src/components/Home/Welcome';
import { HeadTitle } from '../../../src/components/Layout/Head';
import { PostSlide } from '../../../src/components/Tools/Slider/post';
import { MovieSlider } from '../../../src/components/Tools/Slider/Movie';
import { BoardSlide } from '../../../src/components/Tools/Slider/board';

const Home: NextPage = () => {
  return (
    <>
      <HeadTitle title="HOME" />
      <Cont>
        <Top>
          <Welcome />
          <MovieSlider type="trending" />
        </Top>
        <Bottom>
          <PostSlide />
          <BoardSlide />
        </Bottom>
      </Cont>
    </>
  );
};
export default Home;

const Cont = styled.section`
  display: flex;
  padding: 0 50px;
  margin-bottom: 100px;
  flex-direction: column;
  justify-content: center;
  background: ${(p) =>
    `linear-gradient(to top, ${p.theme.color.bg}, transparent), url('/img/home-bg-up.jpg') center / cover no-repeat`};
`;
const Top = styled.section`
  color: #ecf0f1;
  margin-bottom: 50px;
`;
const Bottom = styled.section`
  gap: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
