import styled from '@emotion/styled';
import { Svg } from '../../../../../../Tools/Svg';
import { Dispatch, SetStateAction } from 'react';
import { Flex } from '../../../../../../../styles/global';

interface ISetting {
  _data: {
    theme: boolean;
    hide: boolean;
    original: string | null;
    resetPreview: () => void;
    preview: string | undefined;
    setModal: Dispatch<SetStateAction<string>>;
    setHide: Dispatch<SetStateAction<boolean>>;
  };
}
export const Setting = ({ _data }: ISetting) => {
  const hide = _data?.hide!;
  const theme = _data?.theme!;
  const setHide = _data?.setHide!;
  const preview = _data?.preview!;
  const original = _data?.original!;
  const setModal = _data?.setModal!;
  const resetPreview = _data?.resetPreview!;
  const noImage = !Boolean(original || preview);
  const onClick = (type: string) => {
    if (type === 'add') {
      setHide(false);
      return setModal('upload');
    }
    if (type === 'restore') {
      if (hide) return setHide(false);
    }
    if (type === 'delete') {
      if (preview) return resetPreview();
      else if (original) return setHide(true);
    }
  };

  return (
    <Cont className="setting">
      <div>
        <Svg type="plus" theme={theme} onClick={() => onClick('add')} />
      </div>
      {!noImage && !hide && (
        <div>
          <Svg type="trash" theme={theme} onClick={() => onClick('delete')} />
        </div>
      )}
      {hide && (
        <div>
          <Svg
            theme={theme}
            type="back-arrow"
            onClick={() => onClick('restore')}
          />
        </div>
      )}
    </Cont>
  );
};
const Cont = styled(Flex)`
  gap: 20px;
  z-index: 1;
  justify-content: flex-end;
`;
