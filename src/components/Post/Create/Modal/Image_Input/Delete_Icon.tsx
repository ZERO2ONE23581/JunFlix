import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Svg } from '../../../../../Tools/Svg';
import { opacityVar, scaleVar } from '../../../../../../styles/variants';

interface IDeleteIcon {
  _data: {
    theme: boolean;
    preview: string;
    isNext: boolean;
    onClick: () => void;
  };
}
export const DeleteIcon = ({ _data }: IDeleteIcon) => {
  const theme = _data?.theme;
  const onClick = _data?.onClick;
  const open = Boolean(_data?.preview && !_data?.isNext);
  return (
    <>
      {open && (
        <Cont
          exit="exit"
          initial="initial"
          animate="animate"
          className="circle-svg"
          custom={!theme}
          onClick={onClick}
          variants={opacityVar}
        >
          <Svg type="trash" theme={!theme} />
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
