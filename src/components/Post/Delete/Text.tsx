import styled from '@emotion/styled';

export const Text = () => {
  return (
    <Cont>
      <span className="kor">
        <span>이 포스트를 삭제하시겠습니까?</span>
        <span className="small">* 포스트는 삭제 후 복구가 불가합니다.</span>
      </span>
      <span className="eng">
        <span>Do you like to delete this post?</span>
        <span className="small">
          * The post can not be recoverd after this action.
        </span>
      </span>
    </Cont>
  );
};
const Cont = styled.h2`
  text-align: center;
  .small {
    opacity: 0.7;
    font-style: italic;
  }
  span {
    display: block;
  }
  > span {
    padding: 10px;
  }
`;
