import { Btn } from '..';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import useUser from '../../../libs/client/useUser';
import { DimBackground, Modal } from '../../../../styles/global';
import { Svg } from '../../Svg';

export interface IPostSettingBtn {
  data: {
    userId: number;
    boardId: number;
    boardName: string;
  };
  closeModal: Dispatch<SetStateAction<boolean>>;
  setEdit: Dispatch<SetStateAction<{ update: boolean; delete: boolean }>>;
}
export const PostSettingBtn = ({
  data,
  setEdit,
  closeModal,
}: IPostSettingBtn) => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  const isMyPost = Boolean(loggedInUser?.id === data?.userId);

  const handleClick = (type: string) => {
    closeModal(false);
    if (type === 'edit') return setEdit({ update: true, delete: false });
    if (type === 'delete') return setEdit({ update: false, delete: true });
    if (type === 'board')
      return router.push(
        `/user/${data.userId}/board/${data.boardId}/${data.boardName}`
      );
  };
  return (
    <>
      <ModalBtnCont>
        <Svg type="close" size="2rem" onClick={() => closeModal(false)} />
        {isMyPost && (
          <>
            <Btn
              type="button"
              name="포스트 수정 (Edit Post)"
              onClick={() => handleClick('edit')}
              svg={{ type: 'edit', size: '1.4rem', location: { left: true } }}
            />
            <Btn
              type="button"
              name="포스트 삭제 (Delete Post)"
              CLASSNAME="delete-post-btn"
              onClick={() => handleClick('delete')}
              svg={{ type: 'trash', size: '1.4rem', location: { left: true } }}
            />
          </>
        )}
        <Btn
          type="button"
          name="보드 이동 (Move to Board)"
          onClick={() => handleClick('board')}
          svg={{ type: 'board', size: '1.4rem', location: { left: true } }}
        />
      </ModalBtnCont>
      <DimBackground zIndex={1} onClick={() => closeModal(false)} />
    </>
  );
};
export const ModalBtnCont = styled(Modal)`
  .close {
    top: 2rem;
    right: 2rem;
    position: absolute;
  }
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
    box-shadow: none;
    border-bottom: ${(p) => p.theme.border.thin};
    :nth-of-type(3) {
      border: none;
    }
  }
`;
