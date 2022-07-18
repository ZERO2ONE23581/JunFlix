import styled from '@emotion/styled';
import { ModalProps } from '../../../../types/global';
import { Modal, DimBackground } from '../../../../../styles/global';

export const Answer = ({ openModal }: ModalProps) => {
  return (
    <>
      <Cont>
        <ul>
          <li>
            <span>포스트 내용을 보려면 각 포스트를 클릭하세요.</span>
          </li>
          <li>
            <span>새로운 게시물을 생성하려면 보드를 선택해주세요.</span>
          </li>
        </ul>
        <ul className="eng">
          <li>
            <span>Click the post to see the content.</span>
          </li>
          <li>
            <span>Please select the board to create new POST.</span>
          </li>
        </ul>
      </Cont>
      <DimBackground zIndex={99} onClick={() => openModal(false)} />
    </>
  );
};
const Cont = styled(Modal)`
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
