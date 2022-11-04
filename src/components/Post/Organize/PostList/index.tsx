import { Main } from './Main';
import { Layer } from './Layer';
import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import { OverlayBg } from '../../../../Tools/overlay';
import { IPostUseform } from '../../../../types/post';
import { PostModal } from '../../../../../styles/post';
import { ErrModal } from '../../../../Tools/err_modal';
import { scaleVar } from '../../../../../styles/variants';
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
  const { posts } = useGetPosts({ board_id: 0, host_id: user_id! });
  const { theme, modal, array, layoutId, setModal } = _data;
  const { register, clearErrors, setError, errors } = _useform;
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
              variants={scaleVar}
              custom={{ theme, duration: 0.5 }}
            >
              <Layer
                _data={{
                  theme,
                  setModal,
                  setError,
                  isClicked: Boolean(array?.length > 0),
                }}
              />
              <Main _data={{ array, theme, posts, register }} />
            </Modal>
            <ErrModal
              _data={{
                theme,
                clearErrors,
                id: 'chosenId',
                error: errors?.chosenId?.message,
              }}
            />
            <OverlayBg />
          </>
        )}
      </>
    </AnimatePresence>
  );
};

const Modal = styled(PostModal)`
  top: 2rem;
  width: 40vw;
  height: fit-content;
  max-height: 85vh;
  min-height: 60vh;
`;
