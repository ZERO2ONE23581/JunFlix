import styled from '@emotion/styled';
import { Btn } from '../Button';
import { LoadingModal } from './LoadingModal';
import { MutationRes } from '../../../types/mutation';
import { AnswerModal } from '../../../../styles/global';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useRouter } from 'next/router';

interface IInputs {
  delData?: MutationRes;
  setModal: Dispatch<SetStateAction<boolean>>;
  setRemoveBG?: Dispatch<SetStateAction<boolean>>;
}
export const DeleteBG = ({ delData, setModal, setRemoveBG }: IInputs) => {
  const router = useRouter();
  useEffect(() => {
    if (delData?.data?.ok) router.reload();
  }, [delData?.data, router]);
  return (
    <>
      <Modal>
        <span>사진을 삭제하겠습니까?</span>
        <span>Do you want to remove current photo?</span>
        <div className="btn-wrap">
          <Btn
            name="YES"
            type="submit"
            onClick={() => {
              setRemoveBG!(true);
            }}
          />
          <Btn type="button" name="NO" onClick={() => setModal(false)} />
        </div>
      </Modal>
      {delData?.loading && (
        <LoadingModal
          zIndex={100}
          text={{ kor: '사진 삭제중...', eng: 'Deleting review photo...' }}
        />
      )}
    </>
  );
};
const Modal = styled(AnswerModal)``;
