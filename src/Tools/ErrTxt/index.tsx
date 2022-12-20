import { UseMsg } from '../../libs/client/useMsg';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { ITheme } from '../../../styles/theme';

interface IErrTxt extends ITheme {
  error: string;
}
export const ErrTxt = ({ theme, error }: IErrTxt) => {
  const { txt } = UseMsg({ error });
  return (
    <>
      {error && (
        <Cont
          exit="exit"
          initial="initial"
          animate="animate"
          className="err_msg"
          variants={errVar}
        >
          <span className="kor">{txt.kor}</span>
          <span>{txt.eng}</span>
        </Cont>
      )}
    </>
  );
};

const errVar = {
  exit: () => ({ opacity: 0, scale: 0.1 }),
  initial: () => ({ opacity: 0, scale: 0.1 }),
  animate: () => ({
    scale: 1,
    opacity: 1,
    color: '#E50914',
    transition: { duration: 0.3 },
  }),
};
const Cont = styled(motion.div)`
  font-size: 1.2rem;
  margin: 1rem auto;
  .kor {
    font-size: 1.1rem;
    margin-bottom: 0.2rem;
  }
  span {
    display: block;
    text-align: center;
    font-style: italic;
  }
`;
