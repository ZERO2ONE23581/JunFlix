import { Svg } from '../../../../Tools/Svg';
import { Flex, Layer_ } from '../../../../../styles/global';
import styled from '@emotion/styled';

interface ILayer {
  theme: boolean;
  isDesk: boolean;
  closeModal: () => void;
}
export const Layer = ({ theme, closeModal, isDesk }: ILayer) => {
  const size = isDesk ? '1.7rem' : '3rem';
  return (
    <Cont isDesk={isDesk}>
      <Flex>
        <Svg
          theme={theme}
          item={{ size }}
          type="left-chev"
          onClick={closeModal}
        />
      </Flex>
      <Flex>
        <h1>Select Board</h1>
      </Flex>
      <Flex />
    </Cont>
  );
};
const Cont = styled(Layer_)`
  > div {
    width: fit-content;
  }
  h1 {
    font-size: ${(p) => (p.isDesk ? '2rem' : '4rem')};
  }
`;
