import styled from '@emotion/styled';
import { Btn } from '../../../../Style/Button';
import { Dispatch, SetStateAction } from 'react';
import { AnswerModal, DimBackground } from '../../../../../../styles/global';

interface IConfirmEdit {
  setDeleteBG: Dispatch<SetStateAction<boolean>>;
  setOpenDelModal: Dispatch<SetStateAction<boolean>>;
}
export const DelModal = ({ setDeleteBG, setOpenDelModal }: IConfirmEdit) => {
  return (
    <>
      <Cont>
        <span>배경을 삭제하시겠습니까?</span>
        <span>Would you like to delete the background?</span>
        <div className="btn-wrap">
          <Btn name="YES" type="submit" onClick={() => setDeleteBG(true)} />
          <Btn name="NO" type="button" onClick={() => setOpenDelModal(false)} />
        </div>
      </Cont>
      <DimBackground zIndex={1} />
    </>
  );
};
const Cont = styled(AnswerModal)``;
