import styled from '@emotion/styled';

export const Intro = () => {
  return (
    <Cont>
      <H1>
        <span>"Place for people who love movies."</span>
        <span className="kor">"영화를 사랑하는 사람들을 위한 공간."</span>
      </H1>
      <H2>
        <span>
          <span>
            <span className="red">Social media platforms</span>
            for movie fans.
          </span>
          <span style={{ marginLeft: '10px' }}>
            Make your own movie
            <span className="red">Board</span>
            and share your
            <span className="red">Posts</span>
          </span>
          <span>with others!</span>
        </span>
        <span>
          <span>
            JUNFLIX는 영화인을 위한
            <span className="red">소셜미디어</span>
          </span>
          <span>
            입니다. 여러분만의 영화
            <span className="red">보드</span>를 만들고 영화와 관련된 일상
            <span className="red">포스트</span>
          </span>
          <span>를 공유하세요!</span>
        </span>
      </H2>
    </Cont>
  );
};

const Cont = styled.section``;
const H1 = styled.h1`
  gap: 15px;
  display: flex;
  font-style: italic;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-size: 2.5rem;
  .kor {
    font-size: 2rem;
  }
`;
const H2 = styled(H1)`
  gap: 5px;
  margin-top: 30px;
  font-size: 1.4rem;
  span {
    opacity: 1;
  }
  /* border: 1px solid blue; */
  .red {
    opacity: 1;
    margin: 0 10px;
    font-weight: 500;
    font-size: 1.5rem;
    :hover {
      cursor: pointer;
      text-decoration: underline;
      text-underline-offset: 2px;
    }
  }
  .kor {
    font-size: 1.3rem;
    span {
    }
  }
`;
