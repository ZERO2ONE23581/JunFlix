import styled from '@emotion/styled';
import { Btn } from '../../Style/Button';
import { Dispatch, SetStateAction } from 'react';
import { Modal, DimBackground } from '../../../../styles/global';
import { LoadingModal } from '../../LoadingModal';

interface ISaveEditBoard {
  loading: boolean;
  closeModal: Dispatch<SetStateAction<boolean>>;
}
export const SaveEditBoard = ({ loading, closeModal }: ISaveEditBoard) => {
  return (
    <>
      {!loading ? (
        <Cont>
          <h1>업데이트를 저장하시겠습니까?</h1>
          <h2>Do you want to save the recent update?</h2>
          <div className="btn-wrap">
            <Btn name="YES" type="submit" />
            <Btn name="NO" type="button" onClick={() => closeModal(false)} />
          </div>
        </Cont>
      ) : (
        <LoadingModal
          zIndex={103}
          text={{ kor: '업데이트 저장중...', eng: 'Saving Update...' }}
        />
      )}
      <DimBackground zIndex={102} />
    </>
  );
};
const Cont = styled(Modal)`
  z-index: 103;
  button {
    width: 100%;
  }
`;
