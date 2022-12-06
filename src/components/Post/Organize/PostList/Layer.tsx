import { Svg } from '../../../../Tools/Svg';
import { Btn } from '../../../../Tools/Button';
import { Dispatch, SetStateAction } from 'react';
import { UseFormSetError } from 'react-hook-form';
import { IPostForm } from '../../../../types/post';
import { Layer_ } from '../../../../../styles/global';

interface ILayer {
  _data: {
    theme: boolean;
    isClicked: boolean;
    setError?: UseFormSetError<IPostForm>;
    setModal: Dispatch<SetStateAction<string>>;
  };
}
export const Layer = ({ _data }: ILayer) => {
  const { theme, setModal, setError, isClicked } = _data;
  const onClick = () => {
    if (!isClicked) {
      return setError!('chosenId', { message: '포스트를 선택해주세요.' });
    } else return setModal('boards');
  };
  return (
    <>
      <Layer_>
        <div>
          <Svg type="close_" theme={theme} onClick={() => setModal('')} />
        </div>
        <div />
        <div>
          <Btn
            type="button"
            onClick={onClick}
            item={{ theme, name: 'Next', isClicked }}
          />
        </div>
      </Layer_>
    </>
  );
};
