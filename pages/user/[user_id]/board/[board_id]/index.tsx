import useSWR from 'swr';
import { useState } from 'react';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { IGetBoard } from '../../../../../src/types/board';
import { Title } from '../../../../../src/components/Layout/Title';
import { ModalClose, PageWithBg } from '../../../../../styles/global';
import { BoardDetail } from '../../../../../src/components/User/Board/Detail';
import { DeleteBoardModal } from '../../../../../src/components/User/Board/Delete/Modal';
import { AvatarURL } from '../../../../../src/components/User/Avatar/URL';

const BoardInfo: NextPage = () => {
  const router = useRouter();
  const { user_id, board_id } = router.query;
  const { data } = useSWR<IGetBoard>(
    user_id && board_id && `/api/user/${user_id}/board/${board_id}`
  );
  const avatar = AvatarURL(data?.board?.avatar);
  const [openDelModal, setOpenDelModal] = useState(false);
  return (
    <>
      <Title title={`${data?.board?.user?.username}님의 보드`} />
      <Cont bg={avatar}>
        <BoardDetail board={data?.board} setOpenDelModal={setOpenDelModal} />
      </Cont>
      {openDelModal && <DeleteBoardModal closeModal={setOpenDelModal} />}
      {openDelModal && <ModalClose onClick={() => setOpenDelModal(false)} />}
    </>
  );
};
export default BoardInfo;

const Cont = styled(PageWithBg)`
  padding: 0 11%;
`;
