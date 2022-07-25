import styled from '@emotion/styled';
import { AnswerModal, DimBackground } from '../../../../../../styles/global';
import { ModalProps } from '../../../../../types/global';

export const Answer = ({ openModal }: ModalProps) => {
  return (
    <>
      <Cont>
        <span>새로운 게시물을 생성하려면 보드를 선택해주세요.</span>
        <span>새로운 보드를 생성하려면 '+' 표시 아이콘을 클릭해주세요.</span>
        <span>보드를 팔로우 하려면 '팔로우'버튼을 클릭하세요.</span>
        <span>팔로우된 보드는 'ON AIR'로 표시됩니다.</span>
        <span>보드의 팔로우를 취소하려면 'ON AIR' 버튼을 클릭하세요.</span>
        <span>언팔로우된 보드는 'Follow'로 표시됩니다.</span>
        <span>Please select the board to create new POST.</span>
        <span>Please '+' icon on the side to create new BOARD.</span>
        <span>Click the follow button to 'Follow' board.</span>
        <span>Followed board is displayed as 'ON AIR'</span>
        <span>Click the 'ON AIR' button to unfollow board.</span>
        <span>Unfollowed board is displayed as 'Follow'</span>
      </Cont>
      <DimBackground zIndex={99} onClick={() => openModal(false)} />
    </>
  );
};
const Cont = styled(AnswerModal)`
  padding: 40px;
  gap: 8px;
  align-items: flex-start;
  line-height: 22px;
  li {
    span {
      font-size: 1.2rem;
      font-style: italic;
    }
  }
  .eng {
    margin-bottom: 10px;
  }
`;
