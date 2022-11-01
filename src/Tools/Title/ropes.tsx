import { Svg } from '../Svg';
import styled from '@emotion/styled';
import { ITheme } from '../../../styles/theme';

export const Ropes = ({ theme }: ITheme) => {
  return (
    <Cont>
      <Svg type="ellipsis-v" theme={theme} />
      <Svg type="ellipsis-v" theme={theme} />
    </Cont>
  );
};
const Cont = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
