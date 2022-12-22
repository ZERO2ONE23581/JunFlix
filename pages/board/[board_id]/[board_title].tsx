import { useState } from 'react';
import { IPage } from '../../_app';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import { FlexPage } from '../../../styles/global';
import { Head_ } from '../../../src/Tools/Title/Head';
import { useLogin } from '../../../src/libs/client/useLogin';
import { useGetBoard } from '../../../src/libs/client/useBoards';
import { Board } from '../../../src/components/Board/Read/Board';
import { useModalFixed } from '../../../src/libs/client/useTools';
import { BoardPosts } from '../../../src/components/Board/Read/Posts';
import { BoardModals } from '../../../src/components/Board/Read/Modals';
import { LoadingModal } from '../../../src/Tools/Modal/Loading';

const BoardPage: NextPage<IPage> = ({ theme, setFixed }) => {
  useLogin();
  const router = useRouter();
  const { board_id } = router.query;
  const [type, setType] = useState('');
  const { board, isMyBoard } = useGetBoard(board_id);
  const [createPost, setCreatePost] = useState(false);
  const __must = { theme, board, setFixed };
  useModalFixed({
    setFixed,
    restrict: isMyBoard,
    modal: Boolean(type) || createPost,
  });
  return (
    <>
      <Head_ title={board?.title!} />
      <AnimatePresence>
        {!board && <LoadingModal theme={theme} />}
        {board && (
          <Cont>
            <Board _data={{ ...__must, setType, setCreatePost }} />
            <BoardPosts _data={{ ...__must, createPost, setCreatePost }} />
            <BoardModals _data={{ type, ...__must, setType }} />
          </Cont>
        )}
      </AnimatePresence>
    </>
  );
};
export default BoardPage;

const Cont = styled(FlexPage)`
  flex-direction: column;
`;
