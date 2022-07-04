import styled from '@emotion/styled';
import { Board } from '@prisma/client';
import { useRouter } from 'next/router';
import { Btn } from '../../Style/Button';
import { PageAnswer } from './PageAnswer';
import { DeleteBoard } from '../Delete/DeleteBoard';
import { IconBtn } from '../../Style/Button/IconBtn';
import { EditBackground } from '../Edit/EditBackground';
import { CancelEditBoard } from '../Edit/CancelEditBoard';
import { CreatePost } from '../../Post/Create/CreatePost';
import { Dispatch, SetStateAction, useState } from 'react';
import { DimBackground, Modal } from '../../../../styles/global';

interface IFiexdBtnWrap {
  board?: Board;
  editBoard: boolean;
  setPreview: Dispatch<SetStateAction<string>>;
  setEditBoard: Dispatch<SetStateAction<boolean>>;
}
export const FixedBtnWrap = ({
  editBoard,
  setPreview,
  setEditBoard,
}: IFiexdBtnWrap) => {
  const router = useRouter();
  const [answer, setAnwser] = useState(false);
  const [setting, setSetting] = useState(false);
  const [createPost, setCreatePost] = useState(false);
  const [deleteBoard, setDeleteBoard] = useState(false);
  const [cancelEditBoard, setCancelEditBoard] = useState(false);

  const handleClick = (type: string) => {
    setSetting(false);
    if (type === 'edit-board') return setEditBoard(true);
    if (type === 'delete-board') return setDeleteBoard(true);
    if (type === 'create-post') return setCreatePost(true);
  };
  return (
    <>
      <Cont>
        <IconBtn
          type="button"
          svgType="compass"
          onClick={() => router.push(`/user/all/boards`)}
        />
        {!editBoard && (
          <IconBtn
            type="button"
            svgType="setting"
            isClicked={setting}
            onClick={() => setSetting((p) => !p)}
          />
        )}
        {editBoard && (
          <IconBtn
            type="button"
            svgType="pen"
            isClicked={editBoard}
            onClick={() => setCancelEditBoard(true)}
          />
        )}
        <EditBackground setBoardPreview={setPreview} />
        <IconBtn
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
  top: 10%;
  right: 10%;
  position: absolute;
  gap: 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  svg {
    width: 40px;
    height: 40px;
    fill: ${(p) => p.theme.color.font};
    :hover {
      fill: ${(p) => p.theme.color.logo};
    }
  }
  label {
    svg {
      width: 40px;
      height: 40px;
      fill: ${(p) => p.theme.color.font};
    }
  }
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
