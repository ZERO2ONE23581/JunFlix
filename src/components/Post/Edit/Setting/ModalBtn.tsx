import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Btn } from '../../../Style/Button';
import { Dispatch, SetStateAction } from 'react';
import useUser from '../../../../libs/client/useUser';
import { DimBackground, Modal } from '../../../../../styles/global';
import { IQuery } from '../../../../types/global';

export interface IModalBtn extends IQuery {
  title: string;
  setSetting: Dispatch<SetStateAction<boolean>>;
  setReadPost: Dispatch<SetStateAction<boolean>>;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setDelete: Dispatch<SetStateAction<boolean>>;
}
export const ModalBtn = ({
  query,
  title,
  setSetting,
  setReadPost,
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
      setReadPost(false);
      router.push(`/user/${query.userId}/board/${query.boardId}/${title}`);
    }
  };
  return (
    <>
      <Cont>
        {isMyPost && (
          <>
            <Btn
              type="button"
              name="포스트 수정"
              onClick={() => handleClick('edit')}
            />
            <Btn
              type="button"
              name="포스트 삭제"
              CLASSNAME="delete-post-btn"
              onClick={() => handleClick('delete')}
            />
          </>
        )}
        <Btn
          type="button"
          name="보드로 이동하기"
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
    border-radius: 0%;
    border-bottom: 1px solid ${(p) => p.theme.color.bg};
  }
  .delete-post-btn {
    button {
      border-bottom: none;
    }
  }
`;
