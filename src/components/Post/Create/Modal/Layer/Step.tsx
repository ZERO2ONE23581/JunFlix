import { motion } from 'framer-motion';
import { Svg } from '../../../../../Tools/Svg';
import { Btn } from '../../../../../Tools/Button';

export interface IStep {
  _data: {
    theme: boolean;
    isNext: boolean;
    clickNext?: () => void;
    clickBack?: () => void;
    closeModal: () => void;
  };
}
export const StepFirst = ({ _data }: IStep) => {
  const theme = _data?.theme!;
  const isNext = _data?.isNext!;
  const clickNext = _data?.clickNext!;
  const closeModal = _data?.closeModal!;
  return (
    <>
      {!isNext && (
        <>
          <motion.div>
            <Svg
              theme={theme}
              type={'close_'}
              onClick={closeModal}
              item={{ size: '1.8rem' }}
            />
          </motion.div>
          <motion.div>
            <h1>Upload Image</h1>
          </motion.div>
          <motion.div>
            <Btn
              type="button"
              onClick={clickNext}
              item={{ theme, name: 'Next' }}
            />
          </motion.div>
        </>
      )}
    </>
  );
};
