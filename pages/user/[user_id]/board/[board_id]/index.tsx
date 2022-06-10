import useSWR from 'swr';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { IGetBoardDetail } from '../../../../../src/types/board';
import { DeleteModal } from '../../../../../src/components/Modal/Board/Delete';
import { EditBgAvatar } from '../../../../../src/components/Board/BgAvatar';
import { Btn } from '../../../../../styles/btn';
import { BoardInfo } from '../../../../../src/components/Board';
import { BoardBackground } from '../../../../../src/components/Avatar/\bBoard/Background';
import useUser from '../../../../../src/libs/client/useUser';

const Board: NextPage = () => {
  const router = useRouter();
  const { user_id, board_id } = router.query;
  const queryId = user_id && board_id;
  const { loggedInUser } = useUser();
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
      <BoardBackground preview={preview} url={board?.avatar} />
      {isOwner && (
        <Button
          clicked={isEditAvatar}
          onClick={() => setIsEditAvatar((p) => !p)}
        >
          Background
        </Button>
      )}
      <EditBgAvatar setPreview={setPreview} isEditAvatar={isEditAvatar} />
      <BoardInfo board={board} setDelModal={setDelModal} />
      <DeleteModal
        delModal={delModal}
        deleteClick={() => setDelModal((p) => !p)}
      />
    </Page>
  );
};
export default Board;

const Page = styled.section`
  height: 100vh;
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
`;

const Button = styled(Btn)<{ clicked: boolean }>`
  border-radius: 100%;
  width: 80px;
  height: 80px;
  position: absolute;
  top: 20%;
  right: 10%;
  background-color: ${(p) => p.clicked && p.theme.color.logo};
`;
