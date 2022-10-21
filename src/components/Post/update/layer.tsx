import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Svg } from '../../../Tools/Svg';
import { Btn } from '../../../Tools/Button';
import { Flex } from '../../../../styles/global';
import { variants } from '../../../../styles/variants';

interface ILayer {
  theme: boolean;
  preview: boolean;
  fileInput: boolean;
  onClick: (type: string) => void;
  clickClose: () => void;
}
export const Layer = ({
  theme,
  preview,
  onClick,
  fileInput,
  clickClose,
}: ILayer) => {
  return (
    <Container
      custom={theme}
      animate="animate"
      className="layer"
      variants={variants}
    >
      <Each>
        <Svg type="close_" theme={theme} onClick={clickClose} />
      </Each>
      <Each>
        <h1>Edit Post</h1>
      </Each>
      {fileInput && (
        <Each className="add-skip">
          {!preview && (
            <Btn
              type="button"
              item={{ name: 'Skip', theme }}
              onClick={() => onClick('skip')}
            />
          )}
          {preview && (
            <Btn
              type="button"
              item={{ name: 'Add', theme }}
              onClick={() => onClick('add-new')}
            />
          )}
        </Each>
      )}
      {!fileInput && (
        <Each>
          <Btn type="submit" item={{ name: 'Done', theme }} />
        </Each>
      )}
    </Container>
  );
};

const Container = styled(Flex)`
  padding: 8px 20px;
  justify-content: space-between;
  .add-skip {
    gap: 8px;
  }
`;
const Each = styled(Flex)`
  width: 100%;
  :first-of-type {
    justify-content: flex-start;
  }
  :last-of-type {
    justify-content: flex-end;
  }
  h1 {
    font-size: 1.4rem;
  }
  button {
    width: 80px;
    padding: 5px;
  }
`;
