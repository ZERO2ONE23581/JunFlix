import styled from '@emotion/styled';
import { ModalProps } from '../../../../types/global';
import { DimBackground, AnswerModal } from '../../../../../styles/global';

interface IAnswer extends ModalProps {
  max: {
    title: number;
    intro: number;
  };
}
export const Answer = ({ openModal, max }: IAnswer) => {
  return (
    <>
      <Cont>
        <span>
          <span>보드제목은</span>
          <span className="length">{max.title}</span>
          <span> 자 이내여야 합니다.</span>
        </span>
        <span>
          <span>소개글은</span>
          <span className="length">{max.intro}</span>
          <span> 이내여야 합니다.</span>
        </span>
        <span>보드의 사진을 추가하려면 아이콘을 클릭해주세요.</span>
        <span>
          <span>Board title must be less than or equal to</span>
          <span className="length">{max.title}</span>
          <span> words.</span>
        </span>
        <span>
          <span>Board intro must be less than or equal to</span>
          <span className="length">{max.intro}</span>
          <span> words.</span>
        </span>
        <span>Please click the icon beside to add photo on your Board.</span>
      </Cont>
      <DimBackground zIndex={99} onClick={() => openModal(false)} />
    </>
  );
};
const Cont = styled(AnswerModal)`
  .length {
    margin-left: 10px;
    color: ${(p) => p.theme.color.logo};
  }
`;
