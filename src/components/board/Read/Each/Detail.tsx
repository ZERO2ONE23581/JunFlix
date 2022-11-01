import styled from '@emotion/styled';

interface IBoardDetail {
  _data: {
    onPrivate: boolean;
  };
}
export const Detail = ({ _data }: IBoardDetail) => {
  const onPrivate = _data?.onPrivate!;
  return (
    <Container className="board-detail">
      <ul>
        {onPrivate && (
          <li>
            <span>private</span>
          </li>
        )}
        {!onPrivate && (
          <li>
            <span>public</span>
          </li>
        )}
        <li>
          <span>0</span>
          <span>saved</span>
        </li>
        <li>
          <span>0</span>
          <span>posts</span>
        </li>
      </ul>
    </Container>
  );
};
const Container = styled.div`
  opacity: 0.9;
  ul {
    gap: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    li {
      gap: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
