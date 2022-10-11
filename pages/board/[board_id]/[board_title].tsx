import useSWR from 'swr';
import { useState } from 'react';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Page } from '../../../styles/global';
import { AnimatePresence } from 'framer-motion';
import { IGetBoard } from '../../../src/types/board';
import { HeadTitle } from '../../../src/components/head_title';
import { LoadingModal } from '../../../src/Tools/Modal/loading';
import { ModalSchema } from '../../../src/Tools/Modal/schema';
import { BoardBox } from '../../../src/components/board/read/board_box';

const Board_Page: NextPage<{ theme: boolean }> = ({ theme }) => {
  const router = useRouter();
  const { board_id } = router.query;
  const { data } = useSWR<IGetBoard>(board_id && `/api/board/${board_id}`);
  const board = data?.board;
  const [type, setType] = useState('');
  const closeModal = () => setType('');
  const onClick = (type: string) => {
    if (board) {
      const user_id = board.UserID;
      const username = board.user.username;
      if (type === 'all') router.push(`/board/all`);
      if (type === 'update') setType('update-board');
      if (type === 'delete') setType('delete-board');
      if (type === 'dash') router.push(`/user/${user_id}/${username}/dash`);
    }
  };
  return (
    <>
      <HeadTitle title={data?.board?.title!} />
      <Cont>
        <AnimatePresence>
          {board && (
            <>
              <ModalSchema
                type={type}
                theme={theme}
                ogData={board}
                modal={Boolean(type)}
                closeModal={closeModal}
              />
              <BoardBox theme={theme} board={board} onClick={onClick} />
            </>
          )}
        </AnimatePresence>
        {!board && <LoadingModal theme={theme} />}
      </Cont>
    </>
  );
};
export default Board_Page;

const Cont = styled(Page)`
  .board-box {
    margin: 0 auto;
    padding-top: 50px;
    .board-title {
      max-width: 50vw;
    }
    .content-text {
      max-width: 25vw;
    }
  }
`;
