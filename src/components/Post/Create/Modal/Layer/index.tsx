import { StepFirst } from './Step';
import { StepNext } from './Step_Next';
import { Dispatch, SetStateAction } from 'react';
import { Layer_ } from '../../../../../../styles/global';

interface IPostLayer {
  _data: {
    theme: boolean;
    isNext: boolean;
    closeModal: () => void;
    setStep: Dispatch<SetStateAction<number>>;
  };
}
export const Layer = ({ _data }: IPostLayer) => {
  const theme = _data?.theme!;
  const isNext = _data?.isNext!;
  const setStep = _data?.setStep!;
  const closeModal = _data?.closeModal!;
  const clickBack = () => setStep(1);
  const clickNext = () => setStep(2);
  //
  return (
    <Layer_ className="layer">
      <StepFirst _data={{ theme, isNext, clickNext, closeModal }} />
      <StepNext _data={{ theme, isNext, clickBack, closeModal }} />
    </Layer_>
  );
};
