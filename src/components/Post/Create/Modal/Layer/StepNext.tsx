import { IStep } from './StepFirst';
import { Svg } from '../../../../../Tools/Svg';
import { Btn } from '../../../../../Tools/Button';
import { Flex } from '../../../../../../styles/global';

export const StepNext = ({ _data }: IStep) => {
  const { theme, isNext, clickBack } = _data;
  return (
    <>
      {isNext && (
        <>
          <Flex>
            <Svg
              theme={theme}
              type={'left-chev'}
              onClick={clickBack}
              item={{ size: '1.5rem' }}
            />
          </Flex>
          <Flex>
            <h1>Upload Image</h1>
          </Flex>
          <Flex>
            <Btn type="submit" item={{ theme, name: 'Save' }} />
          </Flex>
        </>
      )}
    </>
  );
};
