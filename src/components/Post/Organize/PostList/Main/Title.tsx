import styled from '@emotion/styled';

export const Title = () => {
  return (
    <Cont>
      <span className="kor">보드에 포스트 정리하기</span>
      <span>Move your posts to Board</span>
      <span className="click">
        체크박스를 클릭하세요. (Click the check box)
      </span>
    </Cont>
  );
};
const Cont = styled.h1`
  span {
    display: block;
    text-align: center;
    font-size: 1.3rem;
    margin-bottom: 3px;
  }
  .kor {
    font-size: 1.2rem;
  }
  .click {
    font-size: 1.1rem;
    opacity: 0.8;
    font-style: italic;
    margin-top: 10px;
  }
`;
