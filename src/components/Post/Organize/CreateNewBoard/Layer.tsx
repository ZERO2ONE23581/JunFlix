import { Svg } from '../../../../Tools/Svg';
import { Layer_ } from '../../../../../styles/global';
import { Btn } from '../../../../Tools/Button';

interface ILayer {
  theme: boolean;
  closeModal: () => void;
}
export const Layer = ({ theme, closeModal }: ILayer) => {
  return (
    <Layer_ className="layer">
      <div>
        <Svg
          theme={theme}
          type="left-chev"
          onClick={closeModal}
          //item={{ size: '1.7rem' }}
        />
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
