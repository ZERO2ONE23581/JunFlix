import styled from '@emotion/styled';
import { useCapLetter } from '../../../libs/client/useTools';
import useUser from '../../../libs/client/useUser';
import { GenreIcons } from '../GenreIcons';
import { Svg } from '../Svg';
import { Movie } from './movie';
import { Ropes } from './ropes';

interface ITitle {
  type: string;
  genreBoardType?: string;
}
export const Title = ({ type, genreBoardType }: ITitle) => {
  const { loggedInUser } = useUser();
  return (
    <Cont>
      <Wrapper>
        <Ropes />
        <H1>
          {type === 'all-boards' && (
            <>
              All Boards <Svg type="board" size="2rem" />
            </>
          )}
          {type === 'my-boards' && (
            <>
              {loggedInUser?.username}'s Boards
              <Svg type="board" size="2rem" />
            </>
          )}
          {type === 'genre-board' && (
            <>
              {genreBoardType?.toUpperCase()} Boards
              <GenreIcons type={useCapLetter(genreBoardType)} />
            </>
          )}
          <Movie type={type!} />
        </H1>
      </Wrapper>
    </Cont>
  );
};
const Cont = styled.article`
  top: 0;
  left: 8rem;
  position: absolute;
  display: flex;
  margin-left: 20px;
  margin-bottom: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  svg {
    pointer-events: none;
  }
`;
const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const H1 = styled.div`
  gap: 10px;
  display: flex;
  align-items: center;
  padding: 10px;
  font-size: 2rem;
  text-align: center;
  border-radius: 5px;
  border: 4px solid ${(p) => p.theme.color.logo};
`;
