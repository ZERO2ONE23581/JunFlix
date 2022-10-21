import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Flex } from '../../../../styles/global';
import { Svg } from '../../../Tools/Svg';

interface IEditBtnWrap {
  theme: boolean;
  data: {
    isHide: boolean;
    preview: string;
    original: string | null;
  };
  onClick: (type: string) => void;
}
export const EditBtns = ({ theme, data, onClick }: IEditBtnWrap) => {
  const preview = data?.preview;
  const original = data?.original;
  const isHide = data?.isHide;
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
const Container = styled(Flex)`
  width: fit-content;
  gap: 20px;
  top: 1rem;
  right: 1.5rem;
  position: absolute;
`;
