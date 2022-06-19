import useSWR from 'swr';
import { useState } from 'react';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { IGetBoard } from '../../../../../src/types/board';
import useUser from '../../../../../src/libs/client/useUser';
import { Title } from '../../../../../src/components/Layout/Title';
import { FormCont, ModalClose } from '../../../../../styles/global';
import { BoardBtnWrap } from '../../../../../src/components/User/Board/BtnWrap';
import { BoardDetail } from '../../../../../src/components/User/Board/BoardDetail';
import { EditBoardForm } from '../../../../../src/components/User/Board/Edit/BoardForm';
import { DeleteBoardModal } from '../../../../../src/components/User/Board/Delete/BoardModal';
import {
  Background,
  CreateAvatarURL,
} from '../../../../../src/components/User/Avatar/Background';

const BoardInfo: NextPage = () => {
  const router = useRouter();
  const { user_id, board_id } = router.query;
  const { loggedInUser } = useUser();
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
        <FormCont className="form-cont">
          <BoardBtnWrap
            isMyBoard={isMyBoard}
            openEdit={openEdit}
            setOpenEdit={setOpenEdit}
            setOpenDelModal={setOpenDelModal}
          />
          {openEdit && (
            <EditBoardForm board={data?.board} setPreview={setPreview} />
          )}
          {!openEdit && (
            <BoardDetail board={data?.board} isMyBoard={isMyBoard} />
          )}
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
  padding-top: 5%;
  .form-cont {
  }
`;
