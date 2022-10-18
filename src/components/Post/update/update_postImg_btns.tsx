import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Svg } from '../../../Tools/Svg';

interface IBtnWrap {
  theme: boolean;
  isBoolean: {
    isHide: boolean;
    preview: boolean;
    original: boolean;
  };
  onClick: (type: string) => void;
}
export const BtnWrap = ({ theme, isBoolean, onClick }: IBtnWrap) => {
  const preview = isBoolean?.preview;
  const original = isBoolean?.original;
  const isHide = isBoolean?.isHide;
  return (
    <Container className="options">
      <div>
        <Svg type="add" theme={theme} onClick={() => onClick('add')} />
      </div>
      {(original || preview) && (
        <div>
          <Svg type="trash" theme={theme} onClick={() => onClick('delete')} />
        </div>
      )}
      {isHide && (
        <div>
          <Svg
            theme={theme}
            type="back-arrow"
            onClick={() => onClick('restore')}
          />
        </div>
      )}
    </Container>
  );
};
const Container = styled(motion.div)`
  top: 5rem;
  right: 1.2rem;
  position: absolute;
  gap: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
