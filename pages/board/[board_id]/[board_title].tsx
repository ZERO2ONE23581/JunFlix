import { useState } from 'react';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import { FlexPage } from '../../../styles/global';
import { NoData } from '../../../src/Tools/NoData';
import { Head_ } from '../../../src/Tools/head_title';
import { BoardSchema } from '../../../src/Tools/Modal/schema';
import { Board } from '../../../src/components/Board/Read/Each';
import { useGetBoard } from '../../../src/libs/client/useBoards';
import { useGetPosts } from '../../../src/libs/client/usePosts';
import { LoadingModal } from '../../../src/Tools/Modal/loading_modal';
import { PostSchema } from '../../../src/components/Post/Schema';

const Board_Page: NextPage<{ theme: boolean }> = ({ theme }) => {
  const router = useRouter();
  const { board_id: board__id } = router.query;
  const board_id = Number(board__id);
  const [type, setType] = useState('');
  const [create, setCreate] = useState(false);
  const { board, isMyBoard } = useGetBoard(board_id);
  const host_id = board?.host_id!;
  const modal = Boolean(type && isMyBoard);
  const { posts, isPost } = useGetPosts({ host_id, board_id });
  return (
    <>
      <Head_ title={board?.title!} />
      <AnimatePresence>
        <Cont>
          {board && (
            <>
              <Board
                theme={theme}
                board={board}
                setType={setType}
                setCreate={setCreate}
              />
              <Layer className="layer">
                {isPost && <PostSchema _data={{ theme, posts, grid: 5 }} />}
                {!isPost && <NoData theme={theme} />}
              </Layer>
              <BoardSchema
                _data={{
                  type,
                  modal,
                  theme,
                  board,
                  closeModal: () => setType(''),
                }}
              />
            </>
          )}
          {!board && <LoadingModal theme={theme} />}
        </Cont>
      </AnimatePresence>
    </>
  );
};
export default Board_Page;

const Cont = styled(FlexPage)`
  gap: 4rem;
  flex-direction: column;
  justify-content: flex-start;
  .board-box {
    width: fit-content;
    //border: 2px solid hotpink;
    .board-title {
      max-width: 60vw;
    }
    .content-text {
      max-width: 30vw;
    }
  }
`;
const Layer = styled(FlexPage)`
  position: relative;
  //border: 2px solid red;
  padding: 0 10rem;
  .lock {
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
  }
`;
