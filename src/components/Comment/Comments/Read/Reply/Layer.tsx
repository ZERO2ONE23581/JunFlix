import styled from '@emotion/styled';
import { Svg } from '../../../../../Tools/Svg';
import { Flex } from '../../../../../../styles/global';

interface IReplyModalLayer {
  _data: {
    theme: boolean;
    userId: string;
    closeModal: () => void;
  };
}
export const Layer = ({ _data }: IReplyModalLayer) => {
  const { userId, theme, closeModal } = _data;
  return (
    <Cont>
      <div>
        <Svg type="close_" theme={theme} onClick={closeModal} />
      </div>
      <div>
        <h1>
          <span>Reply to</span>
          <span className="userId">@{userId}</span>
        </h1>
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
