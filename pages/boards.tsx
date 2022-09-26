import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../styles/global';
import { Title } from '../src/components/Tools/Title';
import { Slider } from '../src/components/Tools/Slider';
import { HeadTitle } from '../src/components/Layout/Head';
import { Fixed } from '../src/components/Tools/Button/Fixed';

const AllBoards: NextPage = () => {
  return (
    <>
      <HeadTitle title="All Boards" />
      <Cont>
        <Title kind="Boards" svg={{ type: 'board', size: '2rem' }} />
        <Slider type="all-boards" />
      </Cont>
      {/* <Fixed type="board" /> */}
    </>
  );
};
export default AllBoards;

const Cont = styled(Page)`
  display: flex;
  padding: 0 7rem;
  align-items: center;
  justify-content: center;
  .slider {
    margin-bottom: 100px;
    .flex {
      gap: 1em;
      .chev-left-arrow,
      .chev-right-arrow {
        width: 55px;
        height: 55px;
      }
      .all-boards {
        min-width: 1em;
        height: 45vh;
        .slide {
          gap: 1em;
        }
      }
    }
  }
`;
