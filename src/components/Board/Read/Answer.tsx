import styled from '@emotion/styled';
import { Modal, DimBackground } from '../../../../styles/global';
import { ModalProps } from '../../../types/global';

export const Answer = ({ openModal }: ModalProps) => {
  return (
    <>
      <Cont>
        <h1>새로운 보드를 생성하려면 '+' 표시 아이콘을 클릭해주세요.</h1>
        <h2>Please '+' icon on the side to create new BOARD.</h2>
        <h1 className="layer">
          새로운 게시물을 생성하려면 보드를 선택해주세요.
        </h1>
        <h2>Please select the board to create new POST.</h2>
      </Cont>
      <DimBackground zIndex={99} onClick={() => openModal(false)} />
    </>
  );
};

const Cont = styled(Modal)`
  padding: 60px 50px;
  gap: 8px;
  font-size: 1rem;
  h1 {
    font-size: 1.2rem;
  }
  .layer {
    margin-top: 20px;
  }
`;
