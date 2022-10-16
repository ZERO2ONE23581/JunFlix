import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import { variants } from '../../../../styles/variants';
import { Svg } from '../../../Tools/Svg';
import { Btn } from '../../../Tools/Button';

interface IPostLayer {
  step: number;
  theme: boolean;
  closeModal: () => void;
  setStep: Dispatch<SetStateAction<number>>;
}
export const Layer = ({ step, theme, setStep, closeModal }: IPostLayer) => {
  const onClick = (type: string) => {
    if (type === 'back') return setStep((p) => (p === 1 ? 1 : p - 1));
    if (type === 'next') return setStep((p) => (p === 2 ? 2 : p + 1));
    if (type === 'close') return closeModal();
  };
  const Step = (num: number) => Boolean(num === step);
  return (
    <Cont
      key={step}
      custom={theme}
      variants={variants}
      className="layer"
      animate="animate"
    >
      <>
        <li>
          {Step(1) && (
            <Svg
              theme={theme}
              type={'close_'}
              onClick={() => onClick('close')}
            />
          )}
          {Step(2) && (
            <Svg
              theme={theme}
              type={'left-chev'}
              onClick={() => onClick('back')}
            />
          )}
        </li>
        <li>
          <h1>
            {Step(1) && 'Upload Image'}
            {Step(2) && 'Create Post'}
          </h1>
        </li>
        <li>
          {Step(1) && (
            <Btn
              type="button"
              item={{ theme, name: 'Next' }}
              onClick={() => onClick('next')}
            />
          )}
          {Step(2) && <Btn type="submit" item={{ theme, name: 'Save' }} />}
        </li>
      </>
    </Cont>
  );
};
const Cont = styled(motion.ul)`
  gap: 0;
  display: flex;
  padding: 0 20px;
  align-items: center;
  justify-content: space-between;
  li {
    h1 {
      font-size: 1.5rem;
    }
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    :first-of-type {
      justify-content: flex-start;
    }
    :last-of-type {
      justify-content: flex-end;
    }
    button {
      padding: 5px;
      max-width: 70px;
    }
  }
`;
