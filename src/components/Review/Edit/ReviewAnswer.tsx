import styled from '@emotion/styled';
import { ModalProps } from '../../../types/global';
import { Modal, DimBackground } from '../../../../styles/global';

export const ReviewAnswer = ({ openModal }: ModalProps) => {
  return (
    <>
      <Cont>
        <Kor>
          <span>* 리뷰제목과 영화제목은 30자를 넘을수 없습니다.</span>
          <span>* 리뷰는 최소 50자 이상이어야 합니다.</span>
          <span>* 별점은 0부터 5까지 선택가능합니다.</span>
          <span>* 한줄평은 30자 이내 작성할 수 있습니다.</span>
          <span className="req">
            * 리뷰제목, 영화제목, 장르선택을 입력해주세요. (필수사항)
          </span>
        </Kor>
        <Eng>
          <span>
            * Maximum length of the review title and movie title are no longer
            than 30 letters.
          </span>
          <span>
            * Minimun length of the review should be more or equal to 50
            letters.
          </span>
          <span>* You can give stars from 0 to 5.</span>
          <span>
            * Maximum length of the one line review is no longer than 30
            letters.
          </span>
          <span className="req">
            * Please type review title, movie title and select the movie genre.
            (REQUIRED)
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
  .req {
    color: ${(p) => p.theme.color.logo};
  }
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
