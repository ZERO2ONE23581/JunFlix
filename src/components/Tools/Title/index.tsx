import styled from '@emotion/styled';
import { Svg } from '../Svg';
import { Movie } from './movie';
import { Ropes } from './ropes';

interface ITitle {
  type?: string;
  kind?: string;
  name?: string;
  svg?: {
    type: string;
    size: string;
  };
}
export const Title = ({ name, type, kind, svg }: ITitle) => {
  return (
    <Cont>
      <Wrapper>
        <Ropes />
        <H1>
          <Movie type={type!} />
          {!name && kind && `All ${kind}`}
          {name && kind && `${name}님의 ${kind}`}
          {svg && <Svg type={svg?.type} size={svg?.size} />}
        </H1>
      </Wrapper>
    </Cont>
  );
};
const Cont = styled.article`
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
  font-size: 1.6rem;
  text-align: center;
  border-radius: 5px;
  border: 4px solid ${(p) => p.theme.color.logo};
`;
