import styled from '@emotion/styled';
import { Btn } from '../../../Style/Button';
import { Dispatch, SetStateAction } from 'react';
import { LoadingModal } from '../../../LoadingModal';
import { Modal, DimBackground } from '../../../../../styles/global';

interface ISubmitEditProps {
  loading: boolean | null;
  closeModal: Dispatch<SetStateAction<boolean>>;
}
export const SaveEdit = ({ loading, closeModal }: ISubmitEditProps) => {
  return (
    <>
      {!loading ? (
        <Cont>
          <h1>수정한 포스트를 저장하시겠습니까?</h1>
          <h2>Do you want to save the recent update?</h2>
          <div className="btn-wrap">
            <Btn name="저장하기" type="submit" />
            <Btn
              name="돌아가기"
              type="button"
              onClick={() => closeModal(false)}
            />
          </div>
        </Cont>
      ) : (
        <LoadingModal
          zIndex={204}
          text={{ kor: '포스트 업데이트중...', eng: 'Updating post...' }}
        />
      )}
      <DimBackground zIndex={202} onClick={() => closeModal(false)} />
    </>
  );
};
const Cont = styled(Modal)`
  z-index: 203;
  border: 1px solid #353b48;
`;
