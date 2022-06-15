import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useUser from '../../../libs/client/useUser';
import { Btn } from '../../Button';

export const BtnWrap = ({ board, isEdit, setIsEdit, setDelModal }: any) => {
  const router = useRouter();
  const { user_id, board_id } = router.query;
  const { loggedInUser } = useUser();
  const isOwner = Boolean(loggedInUser?.id === board?.UserID);
  const [settingBtn, setSettingBtn] = useState(false);
  return (
    <Cont>
      <Btn
        name="Boards"
        type="button"
        clicked={false}
        onClick={() => router.push(`/user/all/boards`)}
      />
      {isOwner && (
        <>
          <Btn
            name="Create"
            type="button"
            clicked={false}
            onClick={() => {
              router.push(`/user/${user_id}/board/${board_id}/post/create`);
            }}
          />
          <Btn
            name="Setting"
            type="button"
            clicked={settingBtn}
            onClick={() => setSettingBtn((p) => !p)}
          />
        </>
      )}
      {settingBtn && (
        <>
          <Btn
            name="Edit"
            type="button"
            clicked={isEdit}
            onClick={() => setIsEdit((p: boolean) => !p)}
          />
          <Btn
            name="Delete"
            type="button"
            clicked={false}
            onClick={() => setDelModal((p: boolean) => !p)}
          />
        </>
      )}
    </Cont>
  );
};
const Cont = styled.article`
  margin: 10px auto;
  display: flex;
  align-items: center;
  gap: 5px;
`;
