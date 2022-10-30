import { motion } from 'framer-motion';
import { Svg } from '../../../../Tools/Svg';
import { Btn } from '../../../../Tools/Button';
import { Layer_ } from '../../../../../styles/global';

interface ILayer {
  theme: boolean;
  closeModal: () => void;
}
export const Layer = ({ theme, closeModal }: ILayer) => {
  return (
    <Layer_ className="layer">
      <motion.div>
        <Svg type="close_" theme={theme} onClick={closeModal} />
      </motion.div>
      <motion.div>
        <h1>Edit Post</h1>
      </motion.div>
      <motion.div>
        <Btn type="submit" item={{ name: 'Done', theme }} />
      </motion.div>
    </Layer_>
  );
};
