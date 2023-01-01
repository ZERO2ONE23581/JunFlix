import { Svg } from '../../../../Tools/Svg';
import { Btn } from '../../../../Tools/Button';
import { Layer_ } from '../../../../../styles/global';
import { useResponsive } from '../../../../libs/client/useTools';

interface ILayer {
  theme: boolean;
  closeModal: () => void;
}
export const Layer = ({ theme, closeModal }: ILayer) => {
  const { isDesk } = useResponsive();
  return (
    <Layer_ className="layer" isDesk={isDesk}>
      <div>
        <Svg theme={theme} type="left-chev" onClick={closeModal} />
      </div>
      <div>
        <h1>Create Board</h1>
      </div>
      <div>
        <Btn type="submit" item={{ theme, name: 'Save' }} />
      </div>
    </Layer_>
  );
};
