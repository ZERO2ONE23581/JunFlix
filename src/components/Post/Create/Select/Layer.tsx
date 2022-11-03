import { motion } from 'framer-motion';
import { Svg } from '../../../../Tools/Svg';
import { Btn } from '../../../../Tools/Button';
import { Layer_ } from '../../../../../styles/global';
import { variants } from '../../../../../styles/variants';

interface ILayer {
  _data: {
    theme: boolean;
    isCreate: boolean;
    clickQuick: () => void;
  };
}
export const Layer = ({ _data }: ILayer) => {
  const theme = _data?.theme!;
  const isCreate = _data?.isCreate!;
  const onClick = _data?.clickQuick!;
  return (
    <Layer_
      custom={theme}
      className="layer"
      animate="animate"
      variants={variants}
    >
      <motion.div>
        {!isCreate && <Svg theme={theme} type="left-chev" onClick={onClick} />}
      </motion.div>
      <motion.div>
        <h1>Select Board</h1>
      </motion.div>
      <motion.div>
        {isCreate && (
          <Btn type="button" onClick={onClick} item={{ theme, name: 'Skip' }} />
        )}
      </motion.div>
    </Layer_>
  );
};
