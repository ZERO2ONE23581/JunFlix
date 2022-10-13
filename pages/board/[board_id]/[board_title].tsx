import useSWR from 'swr';
import { useState } from 'react';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Blur, FlexPage, Layer } from '../../../styles/global';
import { AnimatePresence, motion } from 'framer-motion';
import { IGetBoard } from '../../../src/types/board';
import { HeadTitle } from '../../../src/Tools/head_title';
import { LoadingModal } from '../../../src/Tools/Modal/loading_modal';
import { ModalSchema } from '../../../src/Tools/Modal/schema';
import { BoardBox } from '../../../src/components/board/read/board_box';
import { Svg } from '../../../src/Tools/Svg';
import useUser from '../../../src/libs/client/useUser';
import useFollow from '../../../src/libs/client/useFollowingBoards';

const Board_Page: NextPage<{ theme: boolean }> = ({ theme }) => {
  const router = useRouter();
  const { board_id } = router.query;
  const { loggedInUser } = useUser();
  const { data } = useSWR<IGetBoard>(board_id && `/api/board/${board_id}`);
  const board = data?.board;
  const [type, setType] = useState('');
  const closeModal = () => setType('');
  const clickModal = (type: string) => {
    if (board) {
      const user_id = board.host_id;
      const username = board.host.username;
      if (type === 'all') router.push(`/board/all`);
      if (type === 'update') setType('update-board');
      if (type === 'delete') setType('delete-board');
      if (type === 'dash') router.push(`/user/${user_id}/${username}/dash`);
    }
  };
  const onPublic = !Boolean(board?.isPrivate);
  const { isFollowing } = useFollow(board?.id);
  const isMyBoard = Boolean(loggedInUser?.id === board?.host_id);
  const isBlur = !Boolean(onPublic || isMyBoard || isFollowing);
  return (
    <>
      <HeadTitle title={data?.board?.title!} />
      <Cont>
        <AnimatePresence>
          {data && (
            <>
              <BoardBox theme={theme} board={board!} clickModal={clickModal} />
              <Layer className="layer">
                <Blur className="block" isBlur={isBlur}>
                  <h1>helloworld</h1>
                </Blur>
                {isBlur && <Svg type="lock" size="2rem" theme={theme} />}
              </Layer>
              <ModalSchema
                type={type}
                theme={theme}
                ogData={board!}
                modal={Boolean(type)}
                closeModal={closeModal}
              />
            </>
          )}
        </AnimatePresence>
        {!data && <LoadingModal theme={theme} />}
      </Cont>
    </>
  );
};
export default Board_Page;

const Cont = styled(FlexPage)`
  gap: 50px;
  flex-direction: column;
  justify-content: flex-start;
  .board-box {
    padding-top: 50px;
    .board-title {
      max-width: 50vw;
    }
    .content-text {
      max-width: 25vw;
    }
  }
  .test {
    border: 10px solid blanchedalmond;
    width: 100vw;
    height: 20vh;
  }
`;
