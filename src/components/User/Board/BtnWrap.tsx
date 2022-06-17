import { useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Btn } from '../../Style/Button';

interface IBoardBtnWrap {
  openEdit: boolean;
  isMyBoard: boolean;
  setOpenEdit: any;
  setOpenDelModal: any;
}

export const BoardBtnWrap = ({
  openEdit,
  isMyBoard,
  setOpenEdit,
  setOpenDelModal,
}: IBoardBtnWrap) => {
  const router = useRouter();
  const { user_id, board_id } = router.query;
  const [clickSetting, setClickSetting] = useState(false);
  return (
    <Cont>
      <Btn
        name="Boards"
        type="button"
        clicked={false}
        onClick={() => router.push(`/user/all/boards`)}
      />
      {isMyBoard && (
        <>
          <Btn
            name="게시물 작성"
            type="button"
            clicked={false}
            onClick={() => {
              router.push(`/user/${user_id}/board/${board_id}/post/create`);
            }}
          />
          <Btn
            name="Setting"
            type="button"
            clicked={clickSetting}
            onClick={() => setClickSetting((p) => !p)}
          />
        </>
      )}
      {clickSetting && (
        <>
          <Btn
            name="Edit"
            type="button"
            clicked={openEdit}
            onClick={() => setOpenEdit((p: boolean) => !p)}
          />
          <Btn
            name="Delete"
            type="button"
            clicked={false}
            onClick={() => setOpenDelModal((p: boolean) => !p)}
          />
        </>
      )}
    </Cont>
  );
};
const Cont = styled.article`
  gap: 5px;
  display: flex;
  align-items: center;
  button {
    height: 40px;
  }
`;
