import styled from '@emotion/styled';
import { Btn } from '../../Button';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { IQuery } from '../../../../types/global';
import useUser from '../../../../libs/client/useUser';
import { DimBackground, Modal } from '../../../../../styles/global';

export interface IModalBtn extends IQuery {
  title: string;
  setSetting: Dispatch<SetStateAction<boolean>>;
  setModal: Dispatch<SetStateAction<boolean>>;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setDelete: Dispatch<SetStateAction<boolean>>;
}
export const ModalBtn = ({
  query,
  title,
  setSetting,
  setModal,
  setEdit,
  setDelete,
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
      <Cont>
        {isMyPost && (
          <>
            <Btn
              svg="edit"
              type="button"
              name="포스트 수정 (Edit POST)"
              onClick={() => handleClick('edit')}
            />
            <Btn
              svg="trash"
              type="button"
              name="포스트 삭제 (Delete POST)"
              CLASSNAME="delete-post-btn"
              onClick={() => handleClick('delete')}
            />
          </>
        )}
        <Btn
          svg="board"
          type="button"
          name="보드로 이동하기 (Move to BOARD)"
          onClick={() => handleClick('board')}
        />
      </Cont>
      <DimBackground zIndex={1} onClick={() => setSetting(false)} />
    </>
  );
};
const Cont = styled(Modal)`
  width: 40vw;
  gap: 0;
  padding: 0;
  border: none;
  overflow: hidden;
  border-radius: 3px;
  button {
    width: 100%;
    font-weight: 500;
    border-radius: 0%;
    border-bottom: 1px solid ${(p) => p.theme.color.bg};
    svg {
      margin-bottom: 3px;
    }
  }
`;
