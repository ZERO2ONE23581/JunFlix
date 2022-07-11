import { ModalProps } from '../../../types/global';
import { DimBackground, AnswerModal } from '../../../../styles/global';
import styled from '@emotion/styled';

interface IAnswer extends ModalProps {
  MaxTitle: number;
  MaxIntro: number;
}
export const Answer = ({ openModal, MaxTitle, MaxIntro }: IAnswer) => {
  return (
    <>
      <Cont>
        <ul>
          <li>
            <span>보드제목은</span>
            <span className="length">{MaxTitle}</span>
            <span> 자 이내여야 합니다.</span>
          </li>
          <li>
            <span>소개글은</span>
            <span className="length">{MaxIntro}</span>
            <span> 이내여야 합니다.</span>
          </li>
          <li>
            <span>보드의 사진을 추가하려면 아이콘을 클릭해주세요.</span>
          </li>
        </ul>
        <ul className="eng">
          <li>
            <span>Title of your board should be less than or equal to</span>
            <span className="length">{MaxTitle}</span>
            <span> words.</span>
          </li>
          <li>
            <span>Intro of your board should be less than or equal to</span>
            <span className="length">{MaxIntro}</span>
            <span> words.</span>
          </li>
          <li>
            <span>
              Please click the incon beside to add photo on your Board.
            </span>
          </li>
        </ul>
      </Cont>
      <DimBackground zIndex={99} onClick={() => openModal(false)} />
    </>
  );
};
const Cont = styled(AnswerModal)`
  .length {
    color: ${(p) => p.theme.color.logo};
    margin-left: 10px;
  }
`;
