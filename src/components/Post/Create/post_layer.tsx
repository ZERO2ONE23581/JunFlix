import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import { variants } from '../../../../styles/variants';
import { Svg } from '../../../Tools/Svg';
import { Btn } from '../../../Tools/Button';

interface IPostLayer {
  step: number;
  theme: boolean;
  preview: boolean;
  closeModal: () => void;

  setStep: Dispatch<SetStateAction<number>>;
  setHideInput: Dispatch<SetStateAction<boolean>>;
}
export const Layer = ({
  step,
  theme,
  setStep,
  closeModal,
  setHideInput,
  preview,
}: IPostLayer) => {
  const onClick = (type: string) => {
    if (type === 'back') return setStep((p) => (p === 1 ? 1 : p - 1));
    if (type === 'next') return setStep((p) => (p === 2 ? 2 : p + 1));
    if (type === 'close') return closeModal();
  };
  const Step = (num: number) => Boolean(num === step);
  const clickBack = () => {
    onClick('back');
    setHideInput(false);
  };
  const clickNext = () => {
    onClick('next');
    if (!preview) setHideInput(true);
  };
  return (
    <Cont key={step} className="layer">
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
            <Svg theme={theme} type={'left-chev'} onClick={clickBack} />
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
              onClick={clickNext}
              item={{ theme, name: 'Next' }}
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
  padding: 10px 20px;
  align-items: center;
  justify-content: space-between;
  //border-bottom: 1px dashed ${(p) => p.theme.color.font};
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
