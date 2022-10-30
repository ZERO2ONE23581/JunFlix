import { IStep } from './Step';
import { Svg } from '../../../../../Tools/Svg';
import { Btn } from '../../../../../Tools/Button';
import { motion } from 'framer-motion';

export const StepNext = ({ _data }: IStep) => {
  const theme = _data?.theme!;
  const isNext = _data?.isNext!;
  const clickBack = _data?.clickBack!;
  return (
    <>
      {isNext && (
        <>
          <motion.div>
            <Svg
              theme={theme}
              type={'left-chev'}
              onClick={clickBack}
              item={{ size: '1.5rem' }}
            />
          </motion.div>
          <motion.div>
            <h1>Upload Image</h1>
          </motion.div>
          <motion.div>
            <Btn type="submit" item={{ theme, name: 'Save' }} />
          </motion.div>
        </>
      )}
    </>
  );
};
