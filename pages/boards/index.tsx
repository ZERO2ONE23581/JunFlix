import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../../styles/global';
import { Title } from '../../src/components/Tools/Title';
import { Slider } from '../../src/components/Tools/Slider';
import { HeadTitle } from '../../src/components/Layout/Head';
import { Fixed } from '../../src/components/Tools/Button/Fixed';

const AllBoards: NextPage = () => {
  return (
    <>
      <HeadTitle title="All Boards" />
      <Cont>
        <Title type="all-boards" />
        <Slider type="board" boardType="all" />
      </Cont>
      <Fixed type="board" />
    </>
  );
};
export default AllBoards;

export const BoardPage = styled(Page)`
  background-color: ${(p) => p.theme.color.grey.dark};
  display: flex;
  padding: 0 7rem;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  .slider {
    margin-bottom: 200px;
    .flex {
      gap: 1em;
      .chev-left-arrow,
      .chev-right-arrow {
        width: 55px;
        height: 55px;
      }
      .box {
        min-width: 200px;
        min-height: 440px;
        .slide {
          gap: 1em;
        }
      }
    }
  }
`;
const Cont = styled(BoardPage)`
  .slider {
    margin-bottom: 200px;
    .flex {
      gap: 1em;
      .chev-left-arrow,
      .chev-right-arrow {
        width: 55px;
        height: 55px;
      }
      .box {
        height: 100%;
        min-width: 200px;
        min-height: 440px;
        .slide {
          gap: 1em;
        }
      }
    }
  }
`;
