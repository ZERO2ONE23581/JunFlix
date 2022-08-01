import styled from '@emotion/styled';
import { Btn } from '../Style/Button';
import { Dispatch, SetStateAction } from 'react';
import { AnswerModal, DimBackground } from '../../../styles/global';
import { LoadingModal } from '../LoadingModal';

interface ISaveMnodal {
  Loading: boolean;
  setSaveModal: Dispatch<SetStateAction<boolean>>;
}
export const SaveModal = ({ Loading, setSaveModal }: ISaveMnodal) => {
  return (
    <>
      {!Loading && (
        <Cont>
          <span>배경을 업데이트 하시겠습니까?</span>
          <span>Would you like to update the backgroud?</span>
          <div className="btn-wrap">
            <Btn name="저장" type="submit" />
            <Btn
              type="button"
              name="취소"
              onClick={() => setSaveModal(false)}
            />
          </div>
        </Cont>
      )}
      {Loading && (
        <LoadingModal
          zIndex={100}
          text={{ kor: '보드배경 저장중...', eng: 'Saving Background...' }}
        />
      )}
      <DimBackground zIndex={1} />
    </>
  );
};
const Cont = styled(AnswerModal)``;
