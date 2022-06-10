import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Btn } from '../../../../styles/btn';
import useUser from '../../../libs/client/useUser';

export const BtnWrap = ({ board, isEdit, setIsEdit, setDelModal }: any) => {
  const router = useRouter();
  const { user_id, board_id } = router.query;
  const { loggedInUser } = useUser();
  const isOwner = Boolean(loggedInUser?.id === board?.UserID);
  const [settingBtn, setSettingBtn] = useState(false);
  //
  return (
    <>
      <Cont>
        <Button
          clicked={false}
          type="button"
          onClick={() => router.push(`/all/boards`)}
        >
          Boards
        </Button>
        {isOwner && (
          <>
            <Button
              clicked={false}
              type="button"
              onClick={() => {
                router.push(`/user/${user_id}/board/${board_id}/post/create`);
              }}
            >
              Create
            </Button>
            <Button
              clicked={settingBtn}
              type="button"
              onClick={() => setSettingBtn((p) => !p)}
            >
              Setting
            </Button>
          </>
        )}
        {settingBtn && (
          <>
            <Button
              clicked={isEdit}
              type="button"
              onClick={() => setIsEdit((p: boolean) => !p)}
            >
              Edit
            </Button>
            <Button
              clicked={false}
              type="button"
              onClick={() => setDelModal((p: boolean) => !p)}
            >
              Delete
            </Button>
          </>
        )}
      </Cont>
    </>
  );
};
const Cont = styled.article`
  margin: 10px auto;
  display: flex;
  align-items: center;
  gap: 5px;
`;
const Button = styled(Btn)<{ clicked: boolean }>`
  width: 80px;
  height: 40px;
  background-color: ${(p) => p.clicked && p.theme.color.logo};
`;
