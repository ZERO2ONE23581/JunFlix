import styled from '@emotion/styled';
import { ModalProps } from '../../../../../types/global';
import { Modal, DimBackground } from '../../../../../../styles/global';

export const PageAnswer = ({ openModal }: ModalProps) => {
  return (
    <>
      <Cont>
        <div className="wrap">
          <span>보드를 수정하려면 세팅아이콘을 클릭하세요.</span>
          <span>보드 배경사진은 풍경아이콘을 클릭하세요.</span>
          <span>보드를 만든 본인만이 보드수정이 가능합니다.</span>
          <span>포스트를 확인하려면 포스트 썸네일 이미지를 클릭하세요.</span>
        </div>
        <div className="wrap">
          <span>Click the setting icon beside to edit your board.</span>
          <span>Click the landscape icon to edit borad background image.</span>
          <span>Only the board owner can edit his board.</span>
          <span>Click the post thumnail image icon to see the post.</span>
        </div>
      </Cont>
      <DimBackground zIndex={99} onClick={() => openModal(false)} />
    </>
  );
};
const Cont = styled(Modal)`
  padding: 40px;
  font-size: 1.1rem;
`;
