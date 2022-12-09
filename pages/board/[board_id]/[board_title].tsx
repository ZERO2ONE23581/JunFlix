import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import { FlexPage } from '../../../styles/global';
import { NoData } from '../../../src/Tools/NoData';
import { Head_ } from '../../../src/Tools/head_title';
import { Dispatch, SetStateAction, useState } from 'react';
import { BoardSchema } from '../../../src/Tools/Modal/schema';
import { Board } from '../../../src/components/Board/Read/Each';
import { useGetBoard } from '../../../src/libs/client/useBoards';
import { useGetPosts } from '../../../src/libs/client/usePosts';
import { PostSchema } from '../../../src/components/Post/Schema';
import { CreatePost } from '../../../src/components/Post/Create';
import { LoadingModal } from '../../../src/Tools/Modal/loading_modal';

const BoardPage: NextPage<{
  theme: boolean;
  setFixed: Dispatch<SetStateAction<boolean>>;
}> = ({ theme, setFixed }) => {
  const router = useRouter();
  const { board_id } = router.query;
  const [type, setType] = useState('');
  const [createPost, setCreatePost] = useState(false);
  const { board, isMyBoard } = useGetBoard(Number(board_id));
  const host_id = board?.host_id!;
  const modal = Boolean(type && isMyBoard);
  const { posts, isPost } = useGetPosts({
    host_id,
    board_id: Number(board_id),
  });
  const closeBoard = () => {
    setFixed(false);
    setType('');
  };
  const closeModal = () => {
    setFixed(false);
    setCreatePost(false);
  };
  return (
    <>
      <Head_ title={board?.title!} />
      <AnimatePresence>
        <Cont>
          {board && (
            <>
              <Board
                _data={{ theme, board, setType, setCreatePost, setFixed }}
              />
              <BoardSchema _data={{ type, modal, theme, board, closeBoard }} />
              <Layer className="layer">
                <CreatePost _data={{ theme, createPost, closeModal }} />
                {isPost && (
                  <PostSchema
                    setFixed={setFixed}
                    _data={{ theme, posts, grid: 5 }}
                  />
                )}
                {!isPost && <NoData theme={theme} />}
              </Layer>
            </>
          )}
          {!board && <LoadingModal theme={theme} />}
        </Cont>
      </AnimatePresence>
    </>
  );
};
export default BoardPage;

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
  padding: 0 10rem;
  position: relative;
  justify-content: flex-start;
  .lock {
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
  }
`;
