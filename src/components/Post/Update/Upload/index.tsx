import { Layer } from './Layer';
import { FileInput } from './File';
import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import { IPostUseform } from '../../../../types/post';
import { OverlayBg } from '../../../../Tools/OverlayBg';
import { PostModalStyle } from '../../../../../styles/post';
import { leftToRight } from '../../../../../styles/variants';

export const UploadModal = ({
  _set,
  _data,
  _string,
  _useform,
}: IUploadModal) => {
  const { setModal, setPreview } = _set;
  const { theme, resetPreview } = _data;
  const { modal, preview, layoutId } = _string;
  return (
    <AnimatePresence>
      {modal === 'upload' && (
        <>
          <Cont
            exit="exit"
            initial="initial"
            animate="animate"
            custom={theme}
            variants={leftToRight}
            layoutId={layoutId + 'upload'}
          >
            <Layer _data={{ theme, preview, setModal, resetPreview }} />
            <FileInput
              _useform={_useform}
              _data={{ theme, preview, setPreview }}
            />
          </Cont>
          <OverlayBg dark={0.8} zIndex={111} />
        </>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(PostModalStyle)`
  z-index: 112;
`;
interface IUploadModal extends IPostUseform {
  _string: {
    modal: string;
    preview: string;
    layoutId: string;
  };
  _data: {
    theme: boolean;
    resetPreview: () => void;
  };
  _set: {
    setModal: Dispatch<SetStateAction<string>>;
    setPreview: Dispatch<SetStateAction<string>>;
  };
}
