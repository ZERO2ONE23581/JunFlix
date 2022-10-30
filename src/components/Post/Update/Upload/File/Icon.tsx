import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Svg } from '../../../../../Tools/Svg';
import { Dispatch, SetStateAction } from 'react';
import { scaleVar } from '../../../../../../styles/variants';

interface IIcon {
  theme: boolean;
  preview: string;
  setPreview: Dispatch<SetStateAction<string>>;
}
export const Icon = ({ theme, preview, setPreview }: IIcon) => {
  return (
    <>
      {preview && (
        <Cont
          exit="exit"
          initial="initial"
          animate="animate"
          className="delete-icon"
          custom={theme}
          variants={scaleVar}
          onClick={() => setPreview('')}
        >
          <Svg type="trash" theme={theme} />
        </Cont>
      )}
    </>
  );
};
const Cont = styled(motion.div)`
  z-index: 112;
  padding: 0.5rem;
  border-radius: 10px;
`;
