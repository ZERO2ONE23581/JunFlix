import styled from '@emotion/styled';
import { FlexCol } from '../../../styles/global';

export const Texts = () => {
  return (
    <Cont>
      <Txt>
        <span className="kor">"영화를 사랑하는 사람들을 위한 공간."</span>
        <span>"Place for people who love movies."</span>
      </Txt>
      <Sub>
        <FlexCol className="kor">
          JUNFLIX는 영화인을 위한 소셜 플랫폼 으로서 영화에 <br /> 대한
          아이디어, 글, 이미지 등을 공유하는 공간입니다.
        </FlexCol>
        <FlexCol className="eng">
          JUNFLIX is a social platform where people who love <br /> movies can
          share their ideas, articles and images.
        </FlexCol>
      </Sub>
    </Cont>
  );
};
const Cont = styled(FlexCol)`
  gap: 1rem;
  margin: 0 auto;
  justify-content: center;
`;
const Txt = styled(FlexCol)`
  gap: 0.2rem;
  font-size: 2rem;
  text-align: center;
  .kor {
    font-size: 1.8rem;
  }
`;
const Sub = styled(Txt)`
  opacity: 0.8;
  font-size: 1.6rem;
  font-style: italic;
  > div {
    > span {
      margin-bottom: 0.5rem;
    }
  }
  .kor,
  .eng {
    line-height: 1.7rem;
  }
  .kor {
    font-size: 1.4rem;
  }
`;
