import styled from '@emotion/styled';
import { Btn } from '../../../../Style/Button';
import { Dispatch, SetStateAction } from 'react';
import { AnswerModal, DimBackground } from '../../../../../../styles/global';

interface IConfirmEdit {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}
export const EditModal = ({ setOpenModal }: IConfirmEdit) => {
  return (
    <>
      <Cont>
        <span>배경을 업데이트 하시겠습니까?</span>
        <span>Would you like to update the backgroud?</span>
        <div className="btn-wrap">
          <Btn name="저장" type="submit" />
          <Btn type="button" name="취소" onClick={() => setOpenModal(false)} />
        </div>
      </Cont>
      <DimBackground zIndex={1} />
    </>
  );
};
const Cont = styled(AnswerModal)``;
