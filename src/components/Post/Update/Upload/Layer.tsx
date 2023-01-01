import { motion } from 'framer-motion';
import { Btn } from '../../../../Tools/Button';
import { Dispatch, SetStateAction } from 'react';
import { Layer_ } from '../../../../../styles/global';
import { useResponsive } from '../../../../libs/client/useTools';

interface ILayer {
  _data: {
    theme: boolean;
    preview: string;
    resetPreview: () => void;
    setModal: Dispatch<SetStateAction<string>>;
  };
}
export const Layer = ({ _data }: ILayer) => {
  const theme = _data?.theme!;
  const preview = _data?.preview!;
  const setModal = _data?.setModal!;
  const resetPreview = _data?.resetPreview!;
  const onClick = (skip: boolean) => {
    if (skip) resetPreview();
    setModal('update');
  };
  const { isDesk } = useResponsive();
  return (
    <Layer_ className="layer" isDesk={isDesk}>
      <motion.div />
      <motion.div>
        <h1>New Image</h1>
      </motion.div>
      <motion.div>
        {!preview && (
          <Btn
            type="button"
            item={{ name: 'Skip', theme }}
            onClick={() => onClick(true)}
          />
        )}
        {preview && (
          <Btn
            type="button"
            item={{ name: 'Add', theme }}
            onClick={() => onClick(false)}
          />
        )}
      </motion.div>
    </Layer_>
  );
};
