import styled from '@emotion/styled';
import { Modal, DimBackground } from '../../../../styles/global';
import { ModalProps } from '../../../types/global';

interface IAnswer extends ModalProps {
  maxCnt: number;
  maxTitle: number;
}
export const Answer = ({ openModal, maxCnt, maxTitle }: IAnswer) => {
  return (
    <>
      <Cont>
        <Kor>
          <span>* 게시물 제목은 {maxTitle}자 이내여야 합니다.</span>
          <span>* 게시물 내용은 {maxCnt}자 이내여야 합니다.</span>
          <span>
            * 새로운 사진을 업로드 하시길 원하면 왼쪽 사진을 클릭하세요.
          </span>
        </Kor>
        <Eng>
          <span>
            * Maximum length of the post title is less than {maxTitle} words.
          </span>
          <span>
            * Maximum length of the post content is less than {maxCnt} words.
          </span>
          <span>
            * Click the picture on your left if you'd like to pick a new one.
          </span>
        </Eng>
      </Cont>
      <DimBackground zIndex={102} onClick={() => openModal(false)} />
    </>
  );
};

const Cont = styled(Modal)`
  gap: 4px;
  z-index: 103;
  align-items: flex-start;
  font-style: italic;
  font-size: 1.1rem;
`;
const Kor = styled.div`
  gap: 5px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;
const Eng = styled(Kor)`
  opacity: 0.9;
`;
