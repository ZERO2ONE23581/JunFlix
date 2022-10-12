import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../../styles/global';
import { Slider } from '../../src/Tools/Slider';

import { HeadTitle } from '../../src/components/head_title';
import { PageTitle } from '../../src/Tools/Title/Page_Title';
import { FixedBtns } from '../../src/Tools/Button/Fixed';

const AllBoards: NextPage<{ theme: boolean }> = ({ theme }) => {
  return (
    <>
      <HeadTitle title="All Boards" />
      <Cont>
        <PageTitle type="board" theme={theme} detail={{ all: true }} />
        <Slider
          theme={theme}
          sliderType="board"
          sliderDetail="all"
          pageType="all-boards"
        />
      </Cont>
      <FixedBtns theme={theme} type="board" />
    </>
  );
};
export default AllBoards;

export const BoardPage = styled(Page)`
  padding: 0 8em;
  .no-data {
    //height: 100vh;
  }
  .slider {
    min-height: 85vh;
    .page-title {
    }
    .flex {
      gap: 5px;
      height: 100%;
      min-height: 70vh;
      .row {
        min-height: 30em;
        .slide {
          //border: 2px solid yellow;
          gap: 20px;
          .box-array {
            .slide {
              gap: 20px;
            }
          }
        }
      }
    }
  }
`;
const Cont = styled(BoardPage)``;
