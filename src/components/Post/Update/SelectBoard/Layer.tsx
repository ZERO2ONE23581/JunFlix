import { Svg } from '../../../../Tools/Svg';
import { Flex, Layer_ } from '../../../../../styles/global';

interface ILayer {
  theme: boolean;
  closeModal: () => void;
}
export const Layer = ({ theme, closeModal }: ILayer) => {
  return (
    <Layer_ className="layer">
      <Flex>
        <Svg
          theme={theme}
          type="left-chev"
          onClick={closeModal}
          item={{ size: '1.7rem' }}
        />
      </Flex>
      <Flex>
        <h1>Select Board</h1>
      </Flex>
      <Flex />
    </Layer_>
  );
};
