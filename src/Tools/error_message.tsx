import styled from '@emotion/styled';
import { redColor } from '../../styles/variants';
import { AnimatePresence, motion } from 'framer-motion';

interface IErrMsg {
  error?: string;
}
export const ErrMsg = ({ error }: IErrMsg) => {
  return (
    <AnimatePresence>
      {error && (
        <Container
          exit="exit"
          initial="initial"
          animate="animate"
          variants={error_var}
          className="err-msg"
        >
          {error}
        </Container>
      )}
    </AnimatePresence>
  );
};
const Container = styled(motion.div)`
  width: 100%;
  padding: 5px;
  font-size: 1.2rem;
  text-align: center;
`;
const error_var = {
  exit: { scale: 0, opacity: 0, color: redColor },
  animate: { scale: 1, opacity: 1, color: redColor },
  initial: { scale: 0, opacity: 0, color: redColor },
};
