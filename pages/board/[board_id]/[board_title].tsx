import {
  useGetBoard,
  useBoardPrivate,
} from '../../../src/libs/client/useBoards';
import { useState } from 'react';
import { IPage } from '../../_app';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import { FlexPage } from '../../../styles/global';
import { Head_ } from '../../../src/Tools/head_title';
import { BoardSchema } from '../../../src/Tools/Modal/schema';
import { Board } from '../../../src/components/Board/Read/Each';
import { LoadingModal } from '../../../src/Tools/Modal/loading_modal';
import { BoardContent } from '../../../src/components/Board/Read/Content';
import useFollowingBoard from '../../../src/libs/client/useFollowing/Board';

const BoardPage: NextPage<IPage> = ({ theme, setFixed }) => {
  const router = useRouter();
  const [type, setType] = useState('');
  const board_id = Number(router.query.board_id);
  const { board, isMyBoard } = useGetBoard(board_id);
  const [createPost, setCreatePost] = useState(false);
  const host_id = board?.host_id!;
  const modal = Boolean(type && isMyBoard);
  const closeBoard = () => {
    setType('');
    setFixed(false);
  };
  const {
    isBlur,
    onPrivate,
    onClick: onMode,
  } = useBoardPrivate({ host_id, board_id, isMyBoard });
  const { Saved, isFollowing, onClick, name } = useFollowingBoard(board_id);
  const IsBlur = isBlur && !isFollowing;
  return (
    <>
      <Head_ title={board?.title!} />
      <AnimatePresence>
        <Cont>
          {board && (
            <>
              <Board
                _mode={{ onPrivate, onMode }}
                _follow={{ Saved, isFollowing, onClick, name }}
                _data={{ theme, board, setType, setCreatePost, setFixed }}
              />
              <BoardSchema _data={{ type, modal, theme, board, closeBoard }} />
              <BoardContent
                _data={{
                  theme,
                  IsBlur,
                  host_id,
                  board_id,
                  setFixed,
                  createPost,
                  setCreatePost,
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
