import styled from '@emotion/styled';
import { Modal, DimBackground } from '../../../../styles/global';
import { ModalProps } from '../../../types/global';

export const Answer = ({ openModal }: ModalProps) => {
  return (
    <>
      <Cont>
        <h1>
          <span>* 보드제목은 30자 이내여야 합니다.</span>
          <span>* 소개글은 100자 이내여야 합니다.</span>
          <span>* 보드의 사진을 추가하려면 아이콘을 클릭해주세요.</span>
        </h1>
        <h2>
          <span>
            * Title of your board should be less than or equal to 30 words.
          </span>
          <span>
            * Intro of your board should be less than or equal to 100 words.
          </span>
          <span>
            * Please click the incon beside to add photo on your Board.
          </span>
        </h2>
      </Cont>
      <DimBackground zIndex={99} onClick={() => openModal(false)} />
    </>
  );
};

const Cont = styled(Modal)``;
