import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Svg } from '../../../../../Tools/Svg';
import { color } from '../../../../../../styles/variants';

interface IDeleteIcon {
  _data: {
    theme: boolean;
    preview: string;
    isNext: boolean;
    onClick: () => void;
  };
}
export const DeleteIcon = ({ _data }: IDeleteIcon) => {
  const { theme, preview, isNext, onClick } = _data;
  const open = Boolean(preview && !isNext);
  return (
    <>
      {open && (
        <Cont
          exit="exit"
          initial="initial"
          animate="animate"
          custom={!theme}
          onClick={onClick}
          variants={vars}
        >
          <Svg type="trash" theme={theme} />
        </Cont>
      )}
    </>
  );
};
const Cont = styled(motion.div)`
  top: 1rem;
  left: 1.5rem;
  z-index: 112;
  padding: 0.5rem;
  position: absolute;
  border-radius: 8px;
`;
const vars = {
  exit: { scale: 0, opacity: 0, transition: { duration: 0.3 } },
  initial: { scale: 0, opacity: 0, transition: { duration: 0.3 } },
  animate: (theme: boolean) => ({
    scale: 1,
    opacity: 1,
    transition: { duration: 0.3 },
    backgroundColor: color(theme),
  }),
};
