import useSWR from 'swr';
import { useState } from 'react';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { IGetBoard } from '../../../src/types/board';
import useUser from '../../../src/libs/client/useUser';
import { HeadTitle } from '../../../src/components/Head';
import { BoardBox } from '../../../src/components/Board/Read';
import { IsPost } from '../../../src/components/Post/Read';
import { AVATAR_BG } from '../../../src/components/Avatar/indexafsd';
import { Page } from '../../../styles/global';

const Board_Page: NextPage<{ theme: boolean }> = ({ theme }) => {
  const router = useRouter();
  const { board_id } = router.query;
  const { data } = useSWR<IGetBoard>(board_id && `/api/board/${board_id}`);
  return (
    <>
      <HeadTitle title={data?.board?.title!} />
      <Cont>
        <BoardBox theme={theme} board={data?.board!} />
      </Cont>
    </>
  );
};
export default Board_Page;

const Cont = styled(Page)`
  .board-box {
    margin: 0 auto;
    max-width: 20vw;
    padding-top: 50px;
  }
`;
