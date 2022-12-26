import styled from '@emotion/styled';
import { Svg } from '../../../Tools/Svg';
import { Flex } from '../../../../styles/global';

interface ICmtModalLayer {
  _data: {
    theme: boolean;
    closeModal: () => void;
  };
}
export const Layer = ({ _data }: ICmtModalLayer) => {
  const { theme, closeModal } = _data;
  return (
    <Cont className="layer">
      <div>
        <Svg
          type="close_"
          theme={theme}
          onClick={closeModal}
          item={{ size: '1.8rem' }}
        />
      </div>
      <Flex className="flex">
        <h1>Comments</h1>
        <Svg type="comments" theme={theme} onClick={closeModal} />
      </Flex>
      <div />
    </Cont>
  );
};
const Cont = styled(Flex)`
  padding: 0.8rem 1rem;
  border-bottom: 1px dotted ${(p) => p.theme.color.font};
  .flex {
    gap: 1rem;
  }
`;
