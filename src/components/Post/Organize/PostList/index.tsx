import { Main } from './Main';
import { Layer } from './Layer';
import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import { OverlayBg } from '../../../../Tools/OverlayBg';
import { IPostUseform } from '../../../../types/post';
import { PostSt } from '../../../../../styles/post';
import { ErrModal } from '../../../../Tools/Modal/Error';
import { modalVar } from '../../../../../styles/variants';
import { useUser } from '../../../../libs/client/useUser';
import { useGetPosts } from '../../../../libs/client/usePosts';

interface IPostsModal extends IPostUseform {
  _data: {
    array: [];
    modal: string;
    theme: boolean;
    layoutId: string;
    setModal: Dispatch<SetStateAction<string>>;
  };
}
export const PostsModal = ({ _data, _useform }: IPostsModal) => {
  const { user_id } = useUser();
  const { theme, modal, array, layoutId, setModal } = _data;
  const { register, clearErrors, setError, errors } = _useform;
  const { posts } = useGetPosts({ board_id: 0, host_id: user_id! });
  const closeModal = () => setModal('');
  const isClicked = Boolean(array?.length > 0);
  const error = errors?.chosenId?.message!;
  return (
    <AnimatePresence>
      <>
        {modal === 'posts' && (
          <>
            <Modal
              exit="exit"
              initial="initial"
              animate="animate"
              layoutId={layoutId}
              variants={modalVar}
              custom={{ theme, duration: 0.5 }}
            >
              <Layer
                _data={{ theme, setModal, setError, closeModal, isClicked }}
              />
              <Main _data={{ array, theme, posts, register }} />
            </Modal>
            <ErrModal _data={{ theme, error, clearErrors, id: 'chosenId' }} />
            <OverlayBg />
          </>
        )}
      </>
    </AnimatePresence>
  );
};

const Modal = styled(PostSt)`
  top: 2rem;
  width: 40vw;
  min-height: 60vh;
  max-height: 85vh;
  height: fit-content;
`;
