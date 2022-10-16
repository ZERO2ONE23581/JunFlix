import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Svg } from '../../../../Tools/Svg';
import { Blur, Layer } from '../../../../../styles/global';

interface IMyContents {
  theme: boolean;
  isBlur: boolean;
  category: string;
}
export const MyContents = ({ category, isBlur, theme }: IMyContents) => {
  //
  return (
    <>
      <Layer className="my-contents">
        <Blur className="block" isBlur={isBlur}>
          <Cont
            exit="exit"
            initial="initial"
            animate="animate"
            key={category}
            variants={contentVar}
            className="contents"
          >
            {category === 'likes' && <h2>likes</h2>}
            {category === 'saved' && <h2>saved boards</h2>}
            {category === 'created' && <h2>created contents</h2>}
          </Cont>
        </Blur>
        {isBlur && <Svg type="lock" theme={theme} item={{ size: '2rem' }} />}
      </Layer>
    </>
  );
};
const Cont = styled(motion.article)`
  width: 100vw;
  height: 50vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  h2 {
    font-size: 2rem;
  }
`;

const contentVar = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 1 },
  },
  exit: {
    opacity: 0,
    transition: { delay: 1, duration: 4 },
  },
};
