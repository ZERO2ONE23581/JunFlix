import styled from '@emotion/styled';
import { Btn } from '../Style/Button';
import { Dispatch, SetStateAction } from 'react';
import { AnswerModal, DimBackground } from '../../../styles/global';
import { LoadingModal } from '../LoadingModal';

interface IConfirmEdit {
  Loading: boolean;
  setDelAvatar: Dispatch<SetStateAction<boolean>>;
  setDelModal: Dispatch<SetStateAction<boolean>>;
}
export const DelModal = ({
  setDelAvatar,
  setDelModal,
  Loading,
}: IConfirmEdit) => {
  return (
    <>
      {!Loading && (
        <Cont>
          <span>배경을 삭제하시겠습니까?</span>
          <span>Would you like to delete the background?</span>
          <div className="btn-wrap">
            <Btn name="YES" type="submit" onClick={() => setDelAvatar(true)} />
            <Btn name="NO" type="button" onClick={() => setDelModal(false)} />
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
