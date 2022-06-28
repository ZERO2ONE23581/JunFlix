import styled from '@emotion/styled';
import { Modal, ModalClose, ModalSchema } from '../../../../styles/global';
import { ModalProps } from '../../../types/global';

export const Answer = ({ openModal }: ModalProps) => {
  return (
    <>
      <Cont>
        <div className="layer">
          <h1>* 보드제목은 30자 이내여야 합니다.</h1>
          <h1>* 소개글은 100자 이내여야 합니다.</h1>
          <h1>* 보드의 사진을 추가하려면 아이콘을 클릭해주세요.</h1>
        </div>
        <div className="layer">
          <h2>
            * Title of your board should be less than or equal to 30 words.
          </h2>
          <h2>
            * Intro of your board should be less than or equal to 100 words.
          </h2>
          <h2>* Please click the incon beside to add photo on your Board.</h2>
        </div>
      </Cont>
      <ModalClose onClick={() => openModal(false)} />
    </>
  );
};

const Cont = styled(ModalSchema)`
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 201;
  padding: 30px 40px;
  font-style: italic;
  font-size: 1.3rem;
  h1,
  h2 {
    margin-bottom: 5px;
  }
  h2 {
    opacity: 0.8;
  }
  .layer {
  }
`;
