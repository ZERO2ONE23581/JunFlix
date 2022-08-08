import { Btn } from '..';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { IQuery } from '../../../../types/global';
import useUser from '../../../../libs/client/useUser';
import { DimBackground, Modal } from '../../../../../styles/global';

export interface IModalBtn extends IQuery {
  title: string;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setModal: Dispatch<SetStateAction<boolean>>;
  setDelete: Dispatch<SetStateAction<boolean>>;
  setSetting: Dispatch<SetStateAction<boolean>>;
}
export const ModalBtn = ({
  title,
  query,
  setEdit,
  setModal,
  setDelete,
  setSetting,
}: IModalBtn) => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  const isMyPost = Boolean(loggedInUser?.id === query.userId);
  const handleClick = (type: string) => {
    setSetting(false);
    if (type === 'edit') return setEdit(true);
    if (type === 'delete') return setDelete(true);
    if (type === 'board') {
      setModal(false);
      router.push(`/user/${query.userId}/board/${query.boardId}/${title}`);
    }
  };
  return (
    <>
      <ModalBtnCont>
        {isMyPost && (
          <>
            <Btn
              svg="edit"
              size="1.7rem"
              type="button"
              name="포스트 수정 (Edit Post)"
              onClick={() => handleClick('edit')}
            />
            <Btn
              svg="trash"
              size="1.7rem"
              type="button"
              name="포스트 삭제 (Delete Post)"
              CLASSNAME="delete-post-btn"
              onClick={() => handleClick('delete')}
            />
          </>
        )}
        <Btn
          size="1.7rem"
          svg="board"
          type="button"
          name="보드 이동 (Move to Board)"
          onClick={() => handleClick('board')}
        />
      </ModalBtnCont>
      <DimBackground zIndex={1} onClick={() => setSetting(false)} />
    </>
  );
};
export const ModalBtnCont = styled(Modal)`
  gap: 0;
  width: 60vw;
  z-index: 201;
  border: none;
  overflow: hidden;
  border-radius: 5px;
  background-color: transparent;
  button {
    width: 100%;
    padding: 5px;
    font-weight: 400;
    border-radius: 0%;
    font-size: 1.2rem;
    border-bottom: 1px solid #2d3436;
    :nth-of-type(3) {
      border: none;
    }
  }
`;