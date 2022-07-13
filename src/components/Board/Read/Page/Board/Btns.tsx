import styled from '@emotion/styled';
import { PageAnswer } from './Answer';
import { Board } from '@prisma/client';
import { useRouter } from 'next/router';
import { DeleteBoard } from '../../../Delete';
import { Btn } from '../../../../Style/Button';
import { CancelEditBoard } from '../../../Edit/Cancel';
import useUser from '../../../../../libs/client/useUser';
import { EditBackground } from '../../../Edit/Background';
import { IconBtn } from '../../../../Style/Button/IconBtn';
import { Dispatch, SetStateAction, useState } from 'react';
import { CreatePost } from '../../../../Post/Create/CreatePost';
import { DimBackground, Modal } from '../../../../../../styles/global';

interface IFiexdBtnWrap {
  board?: Board;
  edit: boolean;
  setPreview: Dispatch<SetStateAction<string>>;
  setEdit: Dispatch<SetStateAction<boolean>>;
}
export const PageBtns = ({ edit, setPreview, setEdit }: IFiexdBtnWrap) => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  const { user_id } = router.query;
  const isMyBoard = Boolean(loggedInUser?.id === Number(user_id));
  const [answer, setAnwser] = useState(false);
  const [setting, setSetting] = useState(false);
  const [createPost, setCreatePost] = useState(false);
  const [deleteBoard, setDeleteBoard] = useState(false);
  const [cancelEditBoard, setCancelEditBoard] = useState(false);

  const handleClick = (type: string) => {
    setSetting(false);
    if (type === 'edit-board') return setEdit(true);
    if (type === 'delete-board') return setDeleteBoard(true);
    if (type === 'create-post') return setCreatePost(true);
  };
  return (
    <>
      <Cont>
        <IconBtn
          size="2.5rem"
          type="button"
          svgType="compass"
          onClick={() => router.push(`/user/all/boards`)}
        />
        {isMyBoard && (
          <>
            {!edit && (
              <IconBtn
                size="2.5rem"
                type="button"
                svgType="setting"
                isClicked={setting}
                onClick={() => setSetting((p) => !p)}
              />
            )}
            {edit && (
              <IconBtn
                size="2.5rem"
                type="button"
                svgType="pen"
                isClicked={edit}
                onClick={() => setCancelEditBoard(true)}
              />
            )}
            <EditBackground setBoardPreview={setPreview} />
          </>
        )}
        <IconBtn
          size="2.5rem"
          type="button"
          svgType="question"
          onClick={() => setAnwser((p) => !p)}
        />
        {setting && (
          <>
            <BtnWrap>
              <Btn
                name="보드 수정하기"
                type="button"
                onClick={() => handleClick('edit-board')}
              />
              <Btn
                name="보드 삭제하기"
                type="button"
                onClick={() => handleClick('delete-board')}
              />
              <Btn
                name="포스트 만들기"
                type="button"
                onClick={() => handleClick('create-post')}
              />
            </BtnWrap>
            <DimBackground zIndex={100} onClick={() => setSetting(false)} />
          </>
        )}
      </Cont>

      {answer && <PageAnswer openModal={setAnwser} />}
      {deleteBoard && <DeleteBoard openModal={setDeleteBoard} />}
      {createPost && <CreatePost openCreatePost={setCreatePost} />}
      {cancelEditBoard && <CancelEditBoard closeModal={setCancelEditBoard} />}
    </>
  );
};
const Cont = styled.article`
  top: 20%;
  right: 5%;
  z-index: 100;
  position: absolute;
  gap: 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
const BtnWrap = styled(Modal)`
  z-index: 201;
  width: 40vw;
  gap: 0;
  padding: 0;
  border: none;
  overflow: hidden;
  border-radius: 5px;
  background-color: transparent;
  button {
    width: 100%;
    border-radius: 0%;
    border-bottom: 1px solid #2d3436;
    :nth-of-type(3) {
      border: none;
    }
  }
`;
