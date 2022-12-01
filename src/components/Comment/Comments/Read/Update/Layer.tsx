import styled from '@emotion/styled';
import { Svg } from '../../../../../Tools/Svg';
import { Flex } from '../../../../../../styles/global';

interface IUpdateModalLayer {
  _data: {
    theme: boolean;
    closeModal: () => void;
  };
}
export const Layer = ({ _data }: IUpdateModalLayer) => {
  const { theme, closeModal } = _data;
  return (
    <Cont>
      <div>
        <Svg type="close_" theme={theme} onClick={closeModal} />
      </div>
      <div>
        <h1>Edit Comment</h1>
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
    background-color: inherit;
    border: none;
    outline: none;
  }
`;
