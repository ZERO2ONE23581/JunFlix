import styled from '@emotion/styled';
import { FlexCol } from '../../../../styles/global';

export const Title = () => {
  return (
    <>
      <H1>
        <span>Create Board</span>
        <span className="kor">(보드 생성)</span>
      </H1>
      <Txt>
        <span className="kor">
          * 좋아하는 영화를 위한 보드를 생성해 주세요.
        </span>
        <span>* Create board for your favorite movies.</span>
        <span className="kor">
          * 보드 생성 뒤 포스트를 생성 및 업로드 할 수 있습니다.
        </span>
        <span>* You can create and upload posts after creating board.</span>
      </Txt>
    </>
  );
};
const H1 = styled.h1`
  gap: 0.5rem;
  display: flex;
  font-size: 2rem;
  align-items: center;
  .kor {
    font-size: 1.7rem;
  }
`;
const Txt = styled(FlexCol)`
  opacity: 0.8;
  font-size: 1.2rem;
  font-style: italic;
  padding-top: 0.5rem;
  line-height: 1.3rem;
  align-items: flex-start;

  .kor {
    font-size: 1.1rem;
  }
`;
