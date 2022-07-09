import useSWR from 'swr';
import { useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { IGetBoard } from '../../../../../../src/types/board';
import { AVATAR_PAGE } from '../../../../../../src/components/Avatar';
import { Title } from '../../../../../../src/components/Layout/Title';
import { ReadBoard } from '../../../../../../src/components/Board/Read/ReadBoard';
import { FixedBtnWrap } from '../../../../../../src/components/Board/Read/FixedBtnWrap';

const BoardPage: NextPage = () => {
  const router = useRouter();
  const { user_id, board_id } = router.query;
  const { data } = useSWR<IGetBoard>(
    user_id && board_id && `/api/user/${user_id}/board/${board_id}`
  );
  const board = data?.board;
  const owner = board?.title;
  const [preview, setPreview] = useState('');
  const [editBoard, setEditBoard] = useState(false);
  return (
    <>
      <Title title={`${owner}`} />
      <AVATAR_PAGE avatar={data?.board?.avatar!} preview={preview}>
        <FixedBtnWrap
          setPreview={setPreview}
          editBoard={editBoard}
          setEditBoard={setEditBoard}
        />
        {board && <ReadBoard board={board} editBoard={editBoard} />}
        {!board && <h1>NO BOARD FOUND..</h1>}
      </AVATAR_PAGE>
    </>
  );
};
export default BoardPage;
