import { Svg } from '../Svg';
import styled from '@emotion/styled';
import { ITheme } from '../../../styles/theme';

interface IRopes extends ITheme {
  isWhite: boolean;
}
export const Ropes = ({ theme, isWhite }: IRopes) => {
  return (
    <Cont>
      <Svg
        theme={theme}
        type="ellipsis-v"
        item={{ fill: isWhite ? 'whitesmoke' : '' }}
      />
      <Svg
        theme={theme}
        type="ellipsis-v"
        item={{ fill: isWhite ? 'whitesmoke' : '' }}
      />
    </Cont>
  );
};
const Cont = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
