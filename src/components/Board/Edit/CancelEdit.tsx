import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Btn } from '../../Style/Button';
import { Dispatch, SetStateAction } from 'react';
import { Modal, ModalClose } from '../../../../styles/global';

interface ICancelEditProps {
  closeModal: Dispatch<SetStateAction<boolean>>;
}
export const CancelEdit = ({ closeModal }: ICancelEditProps) => {
  const router = useRouter();
  return (
    <>
      <Cont>
        <h1>업데이트를 취소하시겠습니까?</h1>
        <h2>Do you want to cancel the update?</h2>
        <div className="btn-wrap">
          <Btn name="YES" type="button" onClick={() => router.reload()} />
          <Btn name="NO" type="button" onClick={() => closeModal(false)} />
        </div>
      </Cont>
      <ModalClose zIndex={201} />
    </>
  );
};
const Cont = styled(Modal)`
  z-index: 204;
  border: 1px solid #353b48;
`;
