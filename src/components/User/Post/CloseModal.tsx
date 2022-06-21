import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { Modal, ModalClose } from '../../../../styles/global';
import { Btn } from '../../Style/Button';

interface IClosePostModalProps {
  closeModal: Dispatch<SetStateAction<boolean>>;
  closeDelModal: Dispatch<SetStateAction<boolean>>;
}
export const ClosePostModal = ({
  closeModal,
  closeDelModal,
}: IClosePostModalProps) => {
  const clickDelete = () => {
    closeModal(false);
    closeDelModal(false);
  };
  const clickCancel = () => {
    closeDelModal(false);
  };
  return (
    <>
      <Cont>
        <h1>게시물을 삭제 하시겠습니까?</h1>
        <h2>지금 나가면 수정 내용이 저장되지 않습니다.</h2>
        <div className="btn-wrap">
          <Btn name="삭제" type="button" onClick={clickDelete} />
          <Btn name="취소" type="button" onClick={clickCancel} />
        </div>
      </Cont>
    </>
  );
};
const Cont = styled(Modal)`
  border: 1px solid #353b48;
`;
