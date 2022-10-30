import { Layer } from './Layer';
import { vars } from '../Modal';
import { FileInput } from './File';
import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import { IUseformPost } from '../../../../types/post';
import { OverlayBg } from '../../../../Tools/overlay';
import { PostModal } from '../../../../../styles/post';

interface IUploadFile extends IUseformPost {
  _data: {
    modal: string;
    theme: boolean;
    preview: string;
    layoutId: string;
    resetPreview: () => void;
    setModal: Dispatch<SetStateAction<string>>;
    setPreview: Dispatch<SetStateAction<string>>;
  };
}
export const UploadFile = ({ _data, _useform }: IUploadFile) => {
  const modal = _data?.modal!;
  const theme = _data?.theme!;
  const preview = _data?.preview!;
  const layoutId = _data?.layoutId!;
  const setModal = _data?.setModal!;
  const setPreview = _data?.setPreview!;
  const resetPreview = _data?.resetPreview!;
  //
  return (
    <AnimatePresence>
      {modal === 'upload' && (
        <>
          <Modal
            exit="exit"
            initial="initial"
            animate="animate"
            className="upload-modal"
            custom={theme}
            variants={vars}
            layoutId={layoutId + 'upload'}
          >
            <Layer _data={{ theme, preview, setModal, resetPreview }} />
            <FileInput
              _useform={_useform}
              _data={{ theme, preview, setPreview }}
            />
          </Modal>
          <OverlayBg dark={0.8} zIndex={111} />
        </>
      )}
    </AnimatePresence>
  );
};
const Modal = styled(PostModal)`
  z-index: 112;
`;
