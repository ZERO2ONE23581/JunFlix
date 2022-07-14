import { Btn } from '../../../Style/Button';
import { Dispatch, SetStateAction } from 'react';
import { DimBackground, Modal } from '../../../../../styles/global';

interface IConfirmEdit {
  setDeleteBG: Dispatch<SetStateAction<boolean>>;
  setOpenDelModal: Dispatch<SetStateAction<boolean>>;
}
export const DelModal = ({ setDeleteBG, setOpenDelModal }: IConfirmEdit) => {
  return (
    <>
      <Modal>
        <span>배경을 삭제하시겠습니까?</span>
        <span>Would you like to delete the background?</span>
        <div className="btn-wrap">
          <Btn name="YES" type="submit" onClick={() => setDeleteBG(true)} />
          <Btn name="NO" type="button" onClick={() => setOpenDelModal(false)} />
        </div>
      </Modal>
      <DimBackground zIndex={1} />
    </>
  );
};
