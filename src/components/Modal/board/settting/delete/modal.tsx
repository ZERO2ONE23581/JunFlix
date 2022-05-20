import {
  ModalClose,
  SmallModalCont,
} from '../../../../../../styles/components/modal';
import { Btn } from '../../../../Btn';

export const DeleteBoardModal = () => {
  return (
    <>
      <SmallModalCont>
        <h1>정말로 삭제하시겠습니까?</h1>
        <p>삭제시 복구가 불가능 합니다.</p>
        <Btn type="delete" btnName="삭제 확인" />
      </SmallModalCont>
      <ModalClose />
    </>
  );
};
