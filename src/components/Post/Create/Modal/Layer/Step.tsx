import { motion } from 'framer-motion';
import { Svg } from '../../../../../Tools/Svg';
import { Btn } from '../../../../../Tools/Button';
import { Flex } from '../../../../../../styles/global';

export interface IStep {
  _data: {
    theme: boolean;
    isNext: boolean;
    clickNext?: () => void;
    clickBack?: () => void;
    closeModal: () => void;
  };
}
export const StepFirst = ({ _data }: IStep) => {
  const { theme, isNext, clickNext, closeModal } = _data;
  return (
    <>
      {!isNext && (
        <>
          <Flex>
            <Svg
              theme={theme}
              type={'close_'}
              onClick={closeModal}
              item={{ size: '1.8rem' }}
            />
          </Flex>
          <Flex>
            <h1>Upload</h1>
          </Flex>
          <Flex>
            <Btn
              type="button"
              onClick={clickNext}
              item={{ theme, name: 'Next' }}
            />
          </Flex>
        </>
      )}
    </>
  );
};
