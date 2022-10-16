import { Svg } from './Svg';
import styled from '@emotion/styled';
import { scaleVar } from '../../styles/variants';
import { AnimatePresence, motion } from 'framer-motion';

interface ICircleSvg {
  isHide: boolean;
  theme: boolean;
  onClick: any;
  position?: { top?: string; left?: string };
}
export const CircleSvg = ({ position, isHide, theme, onClick }: ICircleSvg) => {
  return (
    <AnimatePresence>
      {!isHide && (
        <Circle
          position={position}
          exit="exit"
          initial="initial"
          animate="animate"
          className="circle-svg"
          variants={scaleVar}
          custom={!theme}
        >
          <Svg
            type="trash"
            theme={!theme}
            onClick={onClick}
            item={{ isHide }}
          />
        </Circle>
      )}
    </AnimatePresence>
  );
};

const Circle = styled(motion.div)<{
  position?: { top?: string; left?: string };
}>`
  z-index: 999;
  padding: 5px;
  border-radius: 10px;
  position: absolute;
  top: ${(p) => (p.position?.top ? p.position?.top : '1rem')};
  left: ${(p) => (p.position?.left ? p.position?.left : '1rem')};
`;
