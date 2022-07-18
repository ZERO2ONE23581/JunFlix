import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Btn } from '../../../Style/Button';
import { Dispatch, SetStateAction } from 'react';
import useUser from '../../../../libs/client/useUser';
import { DimBackground, Modal } from '../../../../../styles/global';

export interface IBtnModal {
  title: string;
  userId: number;
  boardId: number;
  setSetting: Dispatch<SetStateAction<boolean>>;
  setReadPost: Dispatch<SetStateAction<boolean>>;
  setEditPost: Dispatch<SetStateAction<boolean>>;
  setDeletePost: Dispatch<SetStateAction<boolean>>;
}
export const BtnModal = ({
  userId,
  boardId,
  setReadPost,
  title,
  setSetting,
  setEditPost,
  setDeletePost,
}: IBtnModal) => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  const isMyPost = Boolean(loggedInUser?.id === userId);
  const handleClick = (type: string) => {
    setSetting(false);
    if (type === 'edit') return setEditPost(true);
    if (type === 'delete') return setDeletePost(true);
    if (type === 'board') {
      setReadPost(false);
      router.push(`/user/${userId}/board/${boardId}/${title}`);
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
