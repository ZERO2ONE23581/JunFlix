import { color } from '../../../../../../styles/variants';
import { AnimatePresence, motion } from 'framer-motion';

interface IOriginal {
  _data: {
    theme: boolean;
    preview: string;
  };
}
export const Click = ({ _data }: IOriginal) => {
  const theme = _data?.theme!;
  const preview = _data?.preview!;
  return (
    <AnimatePresence>
      {!preview && (
        <motion.span
          custom={theme}
          exit="exit"
          initial="initial"
          className="click"
          animate="animate"
          whileHover="hover"
          variants={vars}
        >
          Click
        </motion.span>
      )}
    </AnimatePresence>
  );
};
const vars = {
  initial: (theme: boolean) => ({
    x: '-50%',
    y: '-50%',
    opacity: 0,
    color: color(theme),
  }),
  animate: (theme: boolean) => ({
    x: '-50%',
    y: '-50%',
    opacity: 1,
    color: color(theme),
    transition: { duration: 1 },
  }),
  exit: () => ({ opacity: 0, transition: { duration: 0.5 } }),
  hover: { color: '#E50914', scale: 1.2, transition: { duration: 0.3 } },
};
