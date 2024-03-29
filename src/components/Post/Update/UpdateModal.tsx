import { Info } from './Modal/Info';
import { Layer } from './Modal/Layer';
import { Icons } from './Modal/Icons';
import { PostImage } from './Modal/PostImage';
import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import { PostSt } from '../../../../styles/post';
import { IPostUseform } from '../../../types/post';
import { OverlayBg } from '../../../Tools/OverlayBg';
import { leftToRight } from '../../../../styles/variants';
import { Flex, FlexCol } from '../../../../styles/global';
import { useResponsive } from '../../../libs/client/useTools';
import { MobModal } from '../../../../styles/mobile';

export const UpdateModal = ({
  _id,
  _set,
  _set_B,
  _string,
  _boolean,
  _useform,
  resetPreview,
}: IUpdateModal) => {
  const { new_boardId, board_id } = _id;
  const { setModal, setNewBoardId } = _set;
  const { isMobile, isDesk } = useResponsive();
  const { layoutId, preview, original } = _string;
  const { hide, theme, isUpdate, quickSave } = _boolean;
  const { setHide, setIsDelete, setQuickSave, setSelectModal } = _set_B;
  const closeModal = () => {
    resetPreview();
    setNewBoardId(0);
    setQuickSave(false);
    return setModal!('read');
  };
  return (
    <AnimatePresence>
      <>
        {isUpdate && (
          <Cont isDesk={isDesk}>
            <PostSt
              exit="exit"
              initial="initial"
              animate="animate"
              className="modal"
              variants={leftToRight}
              custom={{ theme, isMobile }}
              layoutId={layoutId + 'submit'}
            >
              <Layer theme={theme} closeModal={closeModal} />
              <Main>
                <ImageWrap>
                  <PostImage _data={{ hide, preview, original }} />
                  <Icons
                    _boolean={{ hide, theme }}
                    _set={{ setHide, setModal }}
                    _data={{ preview, original, resetPreview }}
                  />
                </ImageWrap>
                <Info
                  _useform={_useform}
                  _boolean={{ theme, quickSave }}
                  _id={{ board_id, new_boardId }}
                  _set={{ setIsDelete, setSelectModal }}
                />
              </Main>
            </PostSt>
            <OverlayBg dark={0.5} zIndex={111} closeModal={closeModal} />
          </Cont>
        )}
      </>
    </AnimatePresence>
  );
};
const Cont = styled(MobModal)`
  .modal {
    gap: 0.2rem;
    z-index: 112;
    .layer {
      padding: 0;
    }
  }
`;
const Main = styled(FlexCol)`
  padding: 0 2rem 3rem;
`;
const ImageWrap = styled(Flex)`
  position: relative;
  justify-content: flex-start;
`;
interface IUpdateModal extends IPostUseform {
  _string: {
    preview: string;
    layoutId: string;
    original: string | null;
  };
  resetPreview: () => void;
  _id: {
    new_boardId: number;
    board_id: number | null;
  };
  _boolean: {
    hide: boolean;
    theme: boolean;
    isUpdate: boolean;
    quickSave: boolean;
  };
  _set: {
    setModal: Dispatch<SetStateAction<string>>;
    setNewBoardId: Dispatch<SetStateAction<number>>;
  };
  _set_B: {
    setHide: Dispatch<SetStateAction<boolean>>;
    setIsDelete: Dispatch<SetStateAction<boolean>>;
    setQuickSave: Dispatch<SetStateAction<boolean>>;
    setSelectModal: Dispatch<SetStateAction<boolean>>;
  };
}
