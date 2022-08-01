import styled from '@emotion/styled';
import { ModalProps } from '../../../../types/global';
import { DimBackground, AnswerModal } from '../../../../../styles/global';

export const Answer = ({ openModal }: ModalProps) => {
  return (
    <>
      <Cont>
        <span>보드를 수정하려면 세팅아이콘을 클릭하세요.</span>
        <span>보드 배경사진은 풍경아이콘을 클릭하세요.</span>
        <span>보드를 만든 본인만이 보드수정이 가능합니다.</span>
        <span>포스트를 확인하려면 포스트 썸네일 이미지를 클릭하세요.</span>
        <span>Click the setting icon beside to edit your board.</span>
        <span>Click the landscape icon to edit borad background image.</span>
        <span>Only the board owner can edit his board.</span>
        <span>Click the post thumnail image icon to see the post.</span>
      </Cont>
      <DimBackground zIndex={99} onClick={() => openModal(false)} />
    </>
  );
};
const Cont = styled(AnswerModal)`
  text-align: start;
`;
