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
import { useLogin } from '../../../src/libs/client/useLogin';
import { BoardSchema } from '../../../src/Tools/Modal/schema';
import { Board } from '../../../src/components/Board/Read/Each';
import { LoadingModal } from '../../../src/Tools/Modal/loading_modal';
import useFollowUser from '../../../src/libs/client/useFollowing/User';
import { BoardContent } from '../../../src/components/Board/Read/Content';
import useFollowingBoard from '../../../src/libs/client/useFollowing/Board';

const BoardPage: NextPage<IPage> = ({ theme, setFixed }) => {
  useLogin();
  const router = useRouter();
  const [type, setType] = useState('');
  const board_id = Number(router.query.board_id);
  const { board, isMyBoard } = useGetBoard(board_id);
  const [createPost, setCreatePost] = useState(false);
  const host_id = board?.host_id!;
  const modal = Boolean(type && isMyBoard);
  const closeModal = () => {
    setType('');
    setFixed(false);
  };
  const { name, Saved, onClick, isFollowing } = useFollowingBoard(board_id);
  const { onPrivate, handleBoard } = useBoardPrivate({ host_id, board_id });
  const onMode = () => {
    if (!isMyBoard) alert('no_right');
    else handleBoard();
  };
  const isPrivate = (type: string) => {
    if (type === 'board') return onPrivate!;
    if (type === 'user') return board?.host?.onPrivate!;
  };
  const { isFollowing: isUser } = useFollowUser(board?.host_id!);
  const IsBlur = () => {
    if (isMyBoard) return { isBlur: false, msg: 'my_board' };
    if (isPrivate('user')) {
      if (!isUser) return { isBlur: true, msg: 'blur_user' };
      else if (isPrivate('board') && !isFollowing)
        return { isBlur: true, msg: 'blur_board' };
    }
    const isPublic = !isPrivate('user');
    if (isPublic) {
      if (isPrivate('board') && !isFollowing)
        return { isBlur: true, msg: 'blur_board' };
    }
  };
  return (
    <>
      <Head_ title={board?.title!} />
      <AnimatePresence>
        <Cont>
          {board && (
            <>
              <Board
                _follow={{ Saved, isFollowing, onClick, name }}
                _mode={{ onPrivate: isPrivate('board')!, onMode }}
                _data={{ theme, board, setType, setCreatePost, setFixed }}
              />
              <BoardSchema _data={{ type, modal, theme, board, closeModal }} />
              <BoardContent
                _set={{ setFixed, setCreatePost }}
                _data={{ theme, host_id, board_id, createPost }}
                _blur={{ msg: IsBlur()?.msg!, IsBlur: IsBlur()?.isBlur! }}
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
