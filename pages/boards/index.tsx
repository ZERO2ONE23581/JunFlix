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
  background-color: #130f40;
  padding-top: 10%;
  .slider {
    .flex {
      gap: 5px;
      .chev-left-arrow,
      .chev-right-arrow {
        width: 50px;
        height: 50px;
      }
      .row {
        min-height: 440px;
        .slide {
          .box {
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
