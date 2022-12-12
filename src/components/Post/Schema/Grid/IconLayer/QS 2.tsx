import { layerVar } from '.';
import { motion } from 'framer-motion';
import { useUser } from '../../../../../libs/client/useUser';
import styled from '@emotion/styled';

interface ILayerQS {
  _data: {
    theme: boolean;
    isQuick: boolean;
    onClick: () => void;
  };
}
export const QuickSaved = ({ _data }: ILayerQS) => {
  const { userId } = useUser();
  const { theme, onClick, isQuick } = _data;
  return (
    <>
      {isQuick && (
        <h1>
          <span>Quick Saved</span>
          <Span
            animate="animate"
            initial="initial"
            className="small"
            whileHover="hover"
            onClick={onClick}
            variants={layerVar}
            custom={{ theme, isBig: false }}
          >
            (@{userId})
          </Span>
        </h1>
      )}
    </>
  );
};
const Span = styled(motion.span)`
  cursor: pointer;
  font-size: 1rem;
  margin-left: 0.5rem;
`;
