import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Main } from './post_modal_info';
import { ModalSvg } from './post_modal_svg';
import { IPostType } from '../../../types/post';
import { avatarLink } from '../../../Tools/Avatar';
import { OverlayBg } from '../../../Tools/overlay';
import { PostModalStyle, postModalVar } from '../../../../styles/post';

interface IPostModal {
  theme: boolean;
  isMyPost: boolean;
  savedId: number;
  post?: IPostType;
  updatePost: () => void;
  closeModal: () => void;
  clickDelete: () => void;
}
export const PostModal = ({
  post,
  theme,
  savedId,
  closeModal,
  clickDelete,
  isMyPost,
  updatePost,
}: IPostModal) => {
  const title = post?.title!;
  const hash = post?.hashtags!;
  const link = post?.pageLink!;
  const desc = post?.description!;
  const host_id = post?.host?.id!;
  const userId = post?.host?.userId!;
  const host_avatar = post?.host?.avatar!;
  const followers = post?.host?._count?.followers!;
  return (
    <>
      {post && savedId && (
        <>
          <Modal
            exit="exit"
            initial="initial"
            animate="animate"
            custom={theme}
            layoutId={savedId + ''}
            variants={postModalVar}
          >
            <ModalSvg
              theme={theme}
              isMyPost={isMyPost}
              updatePost={updatePost}
              closeModal={closeModal}
              clickDelete={clickDelete}
            />
            <motion.img alt="post image" src={avatarLink(post?.post_image)} />
            <Main
              isMyPost
              theme={theme}
              post={{ hash, link, title }}
              host={{ desc, userId, host_id, followers, host_avatar }}
            />
          </Modal>
          <OverlayBg closeModal={closeModal} dark={0.3} />
        </>
      )}
    </>
  );
};
const Modal = styled(PostModalStyle)`
  z-index: 111;
  overflow: auto;
  height: 90vh;
  img {
    width: 100%;
    min-height: 90vh;
  }
  .close_ {
    top: 1rem;
    left: 1rem;
    position: absolute;
  }
`;
