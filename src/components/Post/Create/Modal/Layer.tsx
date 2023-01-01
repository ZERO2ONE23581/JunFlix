import { StepFirst } from './Layer/StepFirst';
import styled from '@emotion/styled';
import { StepNext } from './Layer/StepNext';
import { Dispatch, SetStateAction } from 'react';
import { Layer_ } from '../../../../../styles/global';

interface IPostLayer {
  _data: {
    theme: boolean;
    isDesk: boolean;
    isNext: boolean;
    closeModal: () => void;
    setStep: Dispatch<SetStateAction<number>>;
  };
}
export const Layer = ({ _data }: IPostLayer) => {
  const clickBack = () => setStep(1);
  const clickNext = () => setStep(2);
  const { theme, isNext, setStep, closeModal, isDesk } = _data;
  return (
    <Cont isDesk={isDesk} className="layer">
      <StepFirst _data={{ theme, isNext, clickNext, closeModal }} />
      <StepNext _data={{ theme, isNext, clickBack, closeModal }} />
    </Cont>
  );
};
const Cont = styled(Layer_)`
  margin-bottom: ${(p) => p.isDesk && '1rem'};
`;
