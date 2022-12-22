import styled from '@emotion/styled';
import { Svg } from '../../../../Tools/Svg';
import { Dispatch, SetStateAction } from 'react';
import { Flex } from '../../../../../styles/global';

export const Icons = ({ _data, _boolean, _set }: Icons) => {
  const { hide, theme } = _boolean;
  const { setModal, setHide } = _set;
  const { original, resetPreview, preview } = _data;
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
    <Cont>
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
  top: 0;
  right: 0;
  gap: 1rem;
  z-index: 1;
  width: fit-content;
  position: absolute;
  justify-content: flex-end;
`;
interface Icons {
  _data: {
    original: string | null;
    resetPreview: () => void;
    preview: string | undefined;
  };
  _boolean: {
    hide: boolean;
    theme: boolean;
  };
  _set: {
    setModal: Dispatch<SetStateAction<string>>;
    setHide: Dispatch<SetStateAction<boolean>>;
  };
}
