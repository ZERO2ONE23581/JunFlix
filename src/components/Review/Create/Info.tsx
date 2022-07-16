import styled from '@emotion/styled';

export const Info = () => {
  return (
    <Cont>
      <span>
        * 사진을 업로드하려면 아이콘을 클릭한 후 배경화면을 클릭하세요.
      </span>
      <span>
        (Click the icon beside and click the screen after to post a photo on
        your review.)
      </span>
    </Cont>
  );
};
const Cont = styled.div`
  font-size: 1rem;
  font-style: italic;
  span {
    display: block;
    line-height: 20px;
  }
`;
