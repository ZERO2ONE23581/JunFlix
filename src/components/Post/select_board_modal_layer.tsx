import styled from '@emotion/styled';
import { Svg } from '../../Tools/Svg';
import { Btn } from '../../Tools/Button';
import { ModalLayer } from '../../../styles/post';
import { variants } from '../../../styles/variants';
import { useCapLetters } from '../../libs/client/useTools';

interface ILayer {
  title: string;
  theme: boolean;
  clickSkip: (id: number) => void;
  closeModal: () => void;
}
export const Layer = ({ title, theme, clickSkip, closeModal }: ILayer) => {
  return (
    <Cont
      custom={theme}
      className="layer"
      animate="animate"
      variants={variants}
    >
      <div>
        <Svg theme={theme} type="left-chev" onClick={closeModal} />
      </div>
      <div>
        <h1>{useCapLetters(title)}</h1>
      </div>
      <div>
        <Btn
          type="button"
          onClick={() => clickSkip(0)}
          item={{ theme, name: 'Skip' }}
        />
      </div>
    </Cont>
  );
};
const Cont = styled(ModalLayer)``;
