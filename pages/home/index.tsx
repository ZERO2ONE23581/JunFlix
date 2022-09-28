import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Page } from '../../styles/global';
import { Slider } from '../../src/components/Tools/Slider';
import { Welcome } from '../../src/components/Home/Welcome';
import { HeadTitle } from '../../src/components/Layout/Head';

const Home: NextPage = () => {
  return (
    <>
      <HeadTitle title="HOME" />
      <Cont>
        <Top>
          <Welcome />
          <Slider type="movie" movieType="trending" />
        </Top>
        <Bottom>
          <Slider type="post" />
          <Slider type="board" boardType="home" />
        </Bottom>
      </Cont>
    </>
  );
};
export default Home;

const Cont = styled(Page)`
  padding: 0;
`;
const Wrap = styled.section`
  padding: 0 3%;
  background: ${(p) =>
    `linear-gradient(90deg, ${p.theme.color.grey.dark},${p.theme.color.bg}, transparent), url('/img/home-bg-up.jpg') center / cover no-repeat`};
`;
const Top = styled(Wrap)`
  padding-bottom: 40px;
`;
const Bottom = styled(Wrap)`
  gap: 40px;
  display: flex;
  margin-top: 0px;
  padding-bottom: 10%;
  flex-direction: column;
  justify-content: center;
`;
