import styled from '@emotion/styled';
import { Svg } from '../Svg';

export const Ropes = () => {
  return (
    <Cont>
      <Svg type="ellipsis-v" fill="#e50914" size="1.6rem" />
      <Svg type="ellipsis-v" fill="#e50914" size="1.6rem" />
    </Cont>
  );
};
const Cont = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
