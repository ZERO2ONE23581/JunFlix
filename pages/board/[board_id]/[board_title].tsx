import { useState } from 'react';
import { IPage } from '../../_app';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { BG } from '../../../styles/global';
import { AnimatePresence } from 'framer-motion';
import { Head_ } from '../../../src/Tools/Title/Head';
import { useLogin } from '../../../src/libs/client/useLogin';
import { LoadingModal } from '../../../src/Tools/Modal/Loading';
import { useGetBoard } from '../../../src/libs/client/useBoards';
import { Board } from '../../../src/components/Board/Read/Board';
import { useResponsive } from '../../../src/libs/client/useTools';
import { BoardPosts } from '../../../src/components/Board/Read/Posts';
import { BoardModals } from '../../../src/components/Board/Read/Modals';

const BoardPage: NextPage<IPage> = ({ theme }) => {
  useLogin();
  const router = useRouter();
  const { board_id } = router.query;
  const { isDesk } = useResponsive();
  const [type, setType] = useState('');
  const { board } = useGetBoard(board_id);
  const [createPost, setCreatePost] = useState(false);
  const __must = { theme, board };
  return (
    <>
      <Head_ title={board?.title!} />
      <AnimatePresence>
        {!board && <LoadingModal theme={theme} />}
        {board && (
          <Cont isDesk={isDesk}>
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

const Cont = styled(BG)`
  .board_title {
    font-size: 5rem;
  }
`;
