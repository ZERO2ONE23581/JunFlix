import { Main } from './Main';
import { Layer } from './Layer';
import styled from '@emotion/styled';
import { SelectModal } from './Select';
import { AnimatePresence } from 'framer-motion';
import { OverlayBg } from '../../../../Tools/Overlay';
import { PostModal } from '../../../../../styles/post';
import { Dispatch, SetStateAction, useState } from 'react';
import { IPostType, IPostUseform } from '../../../../types/post';
import { color, TransBorder } from '../../../../../styles/variants';

interface IModal extends IPostUseform {
  _data: {
    theme: boolean;
    modal: string;
    post: IPostType;
    layoutId: string;
    hide: boolean;
    preview: string;
    new_boardId: number;
    resetPreview: () => void;
    setHide: Dispatch<SetStateAction<boolean>>;
    setModal: Dispatch<SetStateAction<string>>;
    setIsDelete: Dispatch<SetStateAction<boolean>>;
    setNewBoardId: Dispatch<SetStateAction<number>>;
  };
}
export const Modal = ({ _data, _useform }: IModal) => {
  const {
    theme,
    modal,
    post,
    layoutId,
    hide,
    preview,
    new_boardId,
    resetPreview,
    setHide,
    setModal,
    setIsDelete,
    setNewBoardId,
  } = _data;
  const board_id = post?.board_id;
  const original = post?.post_image;
  const [quickSave, setQuickSave] = useState(false);
  const [selectModal, setSelectModal] = useState(false);
  const closeModal = () => {
    resetPreview();
    setNewBoardId(0);
    setQuickSave(false);
    return setModal!('read');
  };
  return (
    <AnimatePresence>
      {modal === 'update' && (
        <>
          <Modal_
            exit="exit"
            initial="initial"
            animate="animate"
            className="update-modal"
            custom={theme}
            variants={vars}
            layoutId={layoutId + 'submit'}
          >
            <Layer theme={theme} closeModal={closeModal} />
            <Main
              _data={{
                quickSave,
                setSelectModal,
                theme,
                hide,
                board_id,
                preview,
                setHide,
                original,
                setModal,
                new_boardId,
                setIsDelete,
                resetPreview,
              }}
              _useform={_useform}
            />
          </Modal_>
          <OverlayBg dark={0.5} zIndex={111} closeModal={closeModal} />

          <SelectModal
            _data={{
              selectModal,
              theme: _data?.theme!,
              host_id: post?.host_id,
              layoutId: _data?.layoutId!,
              closeModal: () => setSelectModal(false),
              selectClick: (type: string, id: number) => {
                if (type === 'quick') setQuickSave(true);
                if (type === 'board' && id) {
                  setQuickSave(false);
                  _data?.setNewBoardId!(id);
                }
                setSelectModal(false);
              },
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
};
const Modal_ = styled(PostModal)`
  gap: 1rem;
  z-index: 112;
  .main {
    .image-setting {
      .post-image {
        width: 15rem;
        height: 15rem;
      }
    }
  }
`;
export const vars = {
  initial: () => ({
    x: -9999,
    scale: 0.5,
    opacity: 0,
    transition: { duration: 0.8 },
  }),
  animate: (theme: boolean) => ({
    x: 0,
    scale: 1,
    opacity: 1,
    color: color(theme),
    border: TransBorder(!theme),
    backgroundColor: color(!theme),
    transition: { duration: 0.8 },
  }),
  exit: () => ({
    x: 9999,
    scale: 0.5,
    opacity: 0,
    transition: { duration: 0.8 },
  }),
};
