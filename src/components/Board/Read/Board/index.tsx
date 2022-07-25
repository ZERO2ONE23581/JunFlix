import useSWR from 'swr';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { EditInfo } from '../../Edit';
import { IBoard } from '../../../../types/board';
import { BtnWrap } from './Detail/Btns';
import { PostList } from '../../../Post/Read/List';
import { IGetAllPosts } from '../../../../types/post';
import useUser from '../../../../libs/client/useUser';
import { Dispatch, SetStateAction, useState } from 'react';
import { Container, DimBackground } from '../../../../../styles/global';
import { Profile } from './Detail/Profile';
import { Info } from './Detail';

interface IReadBoard extends IBoard {
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setPreview: Dispatch<SetStateAction<string>>;
}
export const Board = ({ board, edit, setEdit, setPreview }: IReadBoard) => {
  const isPosts = Boolean(board?.posts?.length! > 0);
  const { data } = useSWR<IGetAllPosts>(
    board && `/api/user/${board?.UserID}/board/${board?.id}/post`
  );
  const router = useRouter();
  const { user_id } = router.query;
  const { loggedInUser } = useUser();
  const [editBg, setEditBg] = useState(false);
  const [setting, setSetting] = useState(false);
  const isMyBoard = Boolean(loggedInUser?.id === Number(user_id));
  return (
    <>
      <Cont>
        <Profile board={board} />
        {!edit && <Info board={board} />}
        {edit && (
          <>
            <EditInfo board={board} setEdit={setEdit} />
          </>
        )}
        {isMyBoard && (
          <BtnWrap
            edit={edit}
            editBg={editBg}
            setEdit={setEdit}
            setting={setting}
            setEditBg={setEditBg}
            setPreview={setPreview}
            setSetting={setSetting}
          />
        )}
      </Cont>
      {isPosts && <PostList posts={data?.posts!} />}
      {!isPosts && <h1>no post found</h1>}
      {edit && <DimBackground zIndex={1} />}
    </>
  );
};
const Cont = styled(Container)`
  gap: 30px;
  z-index: 2;
  display: flex;
  position: relative;
  padding: 30px 50px;
  margin-bottom: 20px;
  align-items: flex-start;
`;
