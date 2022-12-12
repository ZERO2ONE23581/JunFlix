import styled from '@emotion/styled';

interface IBoardDetail {
  _data: {
    Posts: number;
    Saved: number;
    onPrivate: boolean;
  };
}
export const Detail = ({ _data }: IBoardDetail) => {
  const { onPrivate, Posts, Saved } = _data;
  return (
    <Container className="board-detail">
      <ul>
        {onPrivate && (
          <li>
            <span>Private</span>
          </li>
        )}
        {!onPrivate && (
          <li>
            <span>Public</span>
          </li>
        )}
        <li>
          <span>{Saved}</span>
          <span>saved</span>
        </li>
        <li>
          <span>{Posts}</span>
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
