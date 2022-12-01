import styled from '@emotion/styled';
import { Svg } from '../../../../Tools/Svg';
import { Flex } from '../../../../../styles/global';

interface ICreateModalLayer {
  _data: {
    theme: boolean;
    closeCreate: () => void;
  };
}
export const Layer = ({ _data }: ICreateModalLayer) => {
  const { theme, closeCreate } = _data;
  return (
    <Cont>
      <div>
        <Svg type="close_" theme={theme} onClick={closeCreate} />
      </div>
      <div>
        <h1>Add Comment</h1>
      </div>
      <div>
        <button type="submit">
          <Svg type="reply" theme={theme} />
        </button>
      </div>
    </Cont>
  );
};
const Cont = styled(Flex)`
  justify-content: space-between;
  button {
    border: none;
    outline: none;
    background-color: inherit;
  }
`;
