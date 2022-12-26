import styled from '@emotion/styled';
import { Svg } from '../../../../Tools/Svg';
import { Btn } from '../../../../Tools/Button';
import { Flex, Layer_ } from '../../../../../styles/global';
import { useResponsive } from '../../../../libs/client/useTools';

interface ILayer {
  theme: boolean;
  closeModal: () => void;
}
export const Layer = ({ theme, closeModal }: ILayer) => {
  const { isDesk } = useResponsive();
  return (
    <Cont isDesk={isDesk}>
      <Flex>
        <Svg type="close_" theme={theme} onClick={closeModal} />
      </Flex>
      <Flex>
        <h1>Edit</h1>
      </Flex>
      <Flex>
        <Btn type="submit" item={{ name: 'Done', theme }} />
      </Flex>
    </Cont>
  );
};
const Cont = styled(Layer_)`
  padding: ${(p) => (p.isDesk ? '0.6rem 1rem' : '1rem 2rem')};
`;
