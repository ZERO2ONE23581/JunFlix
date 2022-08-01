import styled from '@emotion/styled';
import { Btn } from '../../../Style/Button';
import { Dispatch, SetStateAction } from 'react';
import { LoadingModal } from '../../../LoadingModal';
import { DimBackground, AnswerModal } from '../../../../../styles/global';

interface ISaveEdit {
  loading: boolean | null;
  closeModal: Dispatch<SetStateAction<boolean>>;
}
export const SaveEdit = ({ loading, closeModal }: ISaveEdit) => {
  return (
    <>
      {!loading && (
        <Cont>
          <span>업데이트를 저장하시겠습니까?</span>
          <span>Do you want to save the recent update?</span>
          <div className="btn-wrap">
            <Btn name="저장하기" type="submit" />
            <Btn
              name="돌아가기"
              type="button"
              onClick={() => closeModal(false)}
            />
          </div>
        </Cont>
      )}
      {loading && (
        <LoadingModal
          zIndex={204}
          text={{ kor: '포스트 업데이트중...', eng: 'Updating post...' }}
        />
      )}
      <DimBackground zIndex={202} onClick={() => closeModal(false)} />
    </>
  );
};
const Cont = styled(AnswerModal)`
  z-index: 203;
`;
