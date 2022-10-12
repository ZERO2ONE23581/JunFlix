import styled from '@emotion/styled';
import { ITheme } from '../../../../styles/theme';

interface IBoardDetail extends ITheme {
  data: {
    genre: string;
    isPrivate: boolean;
  };
}
export const BoardDetail = ({ theme, data }: IBoardDetail) => {
  const genre = data.genre;
  const privateMode = data.isPrivate;
  return (
    <Container className="board-detail">
      <ul>
        {genre && (
          <li>
            <span>{genre}</span>
          </li>
        )}
        {privateMode && (
          <li>
            <span>private</span>
          </li>
        )}
        {!privateMode && (
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
