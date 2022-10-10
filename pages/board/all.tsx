import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../../styles/global';
import { Slider } from '../../src/Tools/Slider';
import { Fixed } from '../../src/Tools/Button/Fixed';
import { HeadTitle } from '../../src/components/Head';

const All_Boards: NextPage<{ theme: boolean }> = ({ theme }) => {
  return (
    <>
      <HeadTitle title="All Boards" />
      <Cont>
        <Slider
          theme={theme}
          sliderType="board"
          sliderDetail="all"
          pageType="all-boards"
        />
      </Cont>
      <Fixed type="board" />
    </>
  );
};
export default All_Boards;

export const BoardPage = styled(Page)`
  padding: 0 8em;
  .slider {
    min-height: 85vh;
    .page-title {
    }
    .flex {
      gap: 5px;
      height: 100%;
      min-height: 70vh;
      .left-chevron,
      .right-chevron {
      }
      .row {
        min-height: 30em;
        .slide {
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
