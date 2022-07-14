import { Btn } from '../../../../Style/Button';
import { Dispatch, SetStateAction } from 'react';
import { DimBackground, Modal } from '../../../../../../styles/global';

interface IConfirmEdit {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}
export const EditModal = ({ setOpenModal }: IConfirmEdit) => {
  return (
    <>
      <Modal>
        <span>지정한 배경을 저장하겠습니까?</span>
        <span>Would you like to edit the background?</span>
        <div className="btn-wrap">
          <Btn name="저장" type="submit" />
          <Btn type="button" name="취소" onClick={() => setOpenModal(false)} />
        </div>
      </Modal>
      <DimBackground zIndex={1} />
    </>
  );
};
