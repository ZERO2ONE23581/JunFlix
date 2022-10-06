import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../../styles/global';
import { Title } from '../../src/Tools/Title';
import { Slider } from '../../src/Tools/Slider';
import { HeadTitle } from '../../src/components/Head';
import { Fixed } from '../../src/Tools/Button/Fixed';

const AllBoards: NextPage = () => {
  return (
    <>
      <HeadTitle title="All Boards" />
      <Cont>
        <Title type="all-boards" />
        <Slider pageType="all-boards" sliderType="board" sliderDetail="all" />
      </Cont>
      <Fixed type="board" />
    </>
  );
};
export default AllBoards;

export const BoardPage = styled(Page)`
  padding-top: 10%;
  .slider {
    .flex {
      gap: 5px;
      .left-chevron,
      .right-chevron {
        width: 50px;
        height: 50px;
      }
      .row {
        min-height: 440px;
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
