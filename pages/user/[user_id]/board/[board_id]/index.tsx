import useSWR from 'swr';
import { useState } from 'react';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import useUser from '../../../../../src/libs/client/useUser';
import { BoardInfo } from '../../../../../src/components/Board';
import { IGetBoardDetail } from '../../../../../src/types/board';
import { DeleteModal } from '../../../../../src/components/Modal/Board/Delete';
import { EditBgAvatar } from '../../../../../src/components/Avatar/background/edit';
import { BackGroundAvatar } from '../../../../../src/components/Avatar/background';
import { Btn } from '../../../../../src/components/Button';

const Board: NextPage = () => {
  const router = useRouter();
  const { user_id, board_id } = router.query;
  const queryId = user_id && board_id;
  const { isLoggedIn, loggedInUser } = useUser();
  const { data: BoardData } = useSWR<IGetBoardDetail>(
    queryId && `/api/user/${user_id}/board/${board_id}`
  );
  const board = BoardData?.board;
  const isOwner = Boolean(loggedInUser?.id === board?.UserID);
  const [preview, setPreview] = useState('');
  const [delModal, setDelModal] = useState(false);
  const [isEditAvatar, setIsEditAvatar] = useState(false);
  return (
    <Page>
      <BackGroundAvatar preview={preview} url={board?.avatar} />
      {isOwner && (
        <Btn
          type="button"
          name="Background"
          clicked={isEditAvatar}
          onClick={() => setIsEditAvatar((p) => !p)}
        />
      )}
      <EditBgAvatar setPreview={setPreview} isEditAvatar={isEditAvatar} />
      <BoardInfo
        isLoggedIn={isLoggedIn}
        board={board}
        setDelModal={setDelModal}
        isOwner={isOwner}
      />
      <DeleteModal
        delModal={delModal}
        deleteClick={() => setDelModal((p) => !p)}
      />
    </Page>
  );
};
export default Board;

const Page = styled.section`
  height: 100%;
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
`;
