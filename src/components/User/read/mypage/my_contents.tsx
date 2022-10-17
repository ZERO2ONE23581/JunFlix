import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Svg } from '../../../../Tools/Svg';
import { Blur, Layer } from '../../../../../styles/global';
import { Created } from './content_created';

interface IMyContents {
  theme: boolean;
  isBlur: boolean;
  category: string;
}
export const MyContents = ({ category, isBlur, theme }: IMyContents) => {
  //
  return (
    <>
      <Contents
        exit="exit"
        initial="initial"
        animate="animate"
        className="my-contents"
        key={category}
        variants={contentVar}
      >
        <Created selected={category} theme={theme} />
      </Contents>
      {/* <Layer>
        <Blur className="block" isBlur={isBlur}></Blur>
        {isBlur && <Svg type="lock" theme={theme} item={{ size: '2rem' }} />}
      </Layer> */}
    </>
  );
};
const Contents = styled(motion.section)`
  .created {
    border: 7px solid orange;
    .box {
      border: 5px solid greenyellow;
    }
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
