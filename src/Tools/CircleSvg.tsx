import { Svg } from './Svg';
import styled from '@emotion/styled';
import { scaleVar } from '../../styles/variants';
import { AnimatePresence, motion } from 'framer-motion';

interface ICircleSvg {
  onClick: any;
  isHide: boolean;
  theme: boolean;
}
export const CircleSvg = ({ isHide, theme, onClick }: ICircleSvg) => {
  return (
    <>
      {!isHide && (
        <Circle
          exit="exit"
          initial="initial"
          animate="animate"
          custom={!theme}
          variants={scaleVar}
          className="circle-svg"
        >
          <Svg
            type="trash"
            theme={!theme}
            onClick={onClick}
            item={{ isHide }}
          />
        </Circle>
      )}
    </>
  );
};

const Circle = styled(motion.div)`
  z-index: 999;
  padding: 5px;
  border-radius: 10px;
  position: absolute;
`;
