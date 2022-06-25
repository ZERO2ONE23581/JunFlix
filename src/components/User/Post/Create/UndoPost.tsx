import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { Modal, ModalClose } from '../../../../../styles/global';
import { Btn } from '../../../Style/Button';

interface IClosePostModalProps {
  closePost: Dispatch<SetStateAction<boolean>>;
  closeModal: Dispatch<SetStateAction<boolean>>;
}
export const UndoPost = ({ closePost, closeModal }: IClosePostModalProps) => {
  const handleClick = (isCancel: boolean) => {
    closeModal(false);
    if (isCancel) closePost(false);
  };
  return (
    <>
      <Cont>
        <h1>게시물을 작성을 취소 하시겠습니까?</h1>
        <h2>지금 나가면 수정 내용이 저장되지 않습니다.</h2>
        <div className="btn-wrap">
          <Btn
            name="취소하기"
            type="button"
            onClick={() => handleClick(true)}
          />
          <Btn
            name="계속하기"
            type="button"
            onClick={() => handleClick(false)}
          />
        </div>
      </Cont>
      <DimBackground zIndex={200} onClick={() => handleClick(false)} />
    </>
  );
};
const Cont = styled(Modal)`
  z-index: 201;
  border: ${(p) => p.theme.border.bold};
`;
const DimBackground = styled(ModalClose)`
  background-color: rgba(0, 0, 0, 0.5);
`;
