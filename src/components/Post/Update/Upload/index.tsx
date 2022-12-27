import { Layer } from './Layer';
import { FileInput } from './File';
import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import { PostSt } from '../../../../../styles/post';
import { IPostUseform } from '../../../../types/post';
import { OverlayBg } from '../../../../Tools/OverlayBg';
import { leftToRight } from '../../../../../styles/variants';
import { useResponsive } from '../../../../libs/client/useTools';

export const UploadModal = ({
  _set,
  _data,
  _string,
  _useform,
}: IUploadModal) => {
  const { isMobile } = useResponsive();
  const { theme, resetPreview } = _data;
  const { setModal, setPreview } = _set;
  const { modal, preview, layoutId } = _string;
  return (
    <AnimatePresence>
      {modal === 'upload' && (
        <>
          <Cont
            exit="exit"
            initial="initial"
            animate="animate"
            variants={leftToRight}
            custom={{ theme, isMobile }}
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
const Cont = styled(PostSt)`
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
