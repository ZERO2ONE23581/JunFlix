import styled from '@emotion/styled';
import { Btn } from '../../Style/Button';
import { Dispatch, SetStateAction } from 'react';
import { LoadingModal } from '../../LoadingModal';
import { AnswerModal, DimBackground } from '../../../../styles/global';

interface ISaveCreate {
  loading: boolean;
  setSave: Dispatch<SetStateAction<boolean>>;
}
export const SaveModal = ({ loading, setSave }: ISaveCreate) => {
  return (
    <>
      {!loading && (
        <Cont>
          <span>작성하신 게시물을 제출하시겠습니까?</span>
          <span className="small">* 게시물은 추후에 수정이 가능합니다.</span>
          <span>Would you like to submit your save?</span>
          <span className="small">* You can edit your post after submit.</span>
          <div className="btn-wrap">
            <Btn name="제출하기" type="submit" />
            <Btn name="돌아가기" type="button" onClick={() => setSave(false)} />
          </div>
        </Cont>
      )}
      <DimBackground zIndex={102} onClick={() => setSave(false)} />

      {loading && (
        <LoadingModal
          zIndex={103}
          text={{
            kor: '새로운 포스트 저장중...',
            eng: 'Saving new Post...',
          }}
        />
      )}
    </>
  );
};
const Cont = styled(AnswerModal)`
  z-index: 103;
  .small {
    opacity: 0.5;
    font-size: 1.1rem;
  }
`;
