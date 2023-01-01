import { Svg } from '../../../../Tools/Svg';
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
        <h1>My Boards</h1>
      </div>
      <div />
    </Layer_>
  );
};
