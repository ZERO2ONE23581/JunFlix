import useSWR from 'swr';
import { useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import useUser from '../../../../../src/libs/client/useUser';
import { Title } from '../../../../../src/components/Layout/Title';
import { BoardBtnWrap } from '../../../../../src/components/User/Board/BtnWrap';
import { DeleteBoardModal } from '../../../../../src/components/User/Board/Delete/BoardModal';
import { EditBoardForm } from '../../../../../src/components/User/Board/Edit/BoardForm';
import { FormCont, ModalClose } from '../../../../../styles/global';
import styled from '@emotion/styled';
import {
  Background,
  CreateAvatarURL,
} from '../../../../../src/components/User/Avatar/Background';
import { IGetBoard } from '../../../../../src/types/board';
import { PostList } from '../../../../../src/components/User/Post/PostList';
import { FollowBoard } from '../../../../../src/components/User/Board/Follow/FollowBoard';

const BoardInfo: NextPage = () => {
  const router = useRouter();
  const { user_id, board_id } = router.query;
  const { isLoggedIn, loggedInUser } = useUser();
  const { data } = useSWR<IGetBoard>(
    user_id && board_id && `/api/user/${user_id}/board/${board_id}`
  );
  const avatar = CreateAvatarURL(data?.board?.avatar);
  const isMyBoard = Boolean(loggedInUser?.id === data?.board?.UserID);
  const [preview, setPreview] = useState('');
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelModal, setOpenDelModal] = useState(false);
  return (
    <>
      <Title title={`${data?.board?.user?.username}님의 보드`} />
      <Cont bg={preview ? preview : avatar ? avatar : null}>
        {isLoggedIn && <FollowBoard isMyBoard={isMyBoard} />}
        <FormCont>
          <BoardBtnWrap
            isMyBoard={isMyBoard}
            openEdit={openEdit}
            setOpenEdit={setOpenEdit}
            setOpenDelModal={setOpenDelModal}
          />
          {openEdit && (
            <EditBoardForm board={data?.board} setPreview={setPreview} />
          )}
          {!openEdit && <PostList isMyPosts posts={data?.board?.posts} />}
        </FormCont>
      </Cont>

      {openDelModal && (
        <DeleteBoardModal isMyBoard={isMyBoard} closeModal={setOpenDelModal} />
      )}
      {openDelModal && <ModalClose onClick={() => setOpenDelModal(false)} />}
    </>
  );
};
export default BoardInfo;

const Cont = styled(Background)`
  /* display: flex;
  align-items: center;
  justify-content: center; */
`;
