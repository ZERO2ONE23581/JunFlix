import { Info } from './Info';
import { Setting } from './Setting';
import { motion } from 'framer-motion';
import { CommentBox } from './Comments';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { IPostType } from '../../../../types/post';
import { avatarLink } from '../../../../Tools/Avatar';
import { OverlayBg } from '../../../../Tools/overlay';
import { useUser } from '../../../../libs/client/useUser';
import { PostModal, postVar } from '../../../../../styles/post';

export interface IReadPost {
  _data: {
    theme: boolean;
    post: IPostType;
    modal: string;
    setModal: Dispatch<SetStateAction<string>>;
  };
}
export const ReadPost = ({ _data }: IReadPost) => {
  const router = useRouter();
  const post = _data?.post!;
  const theme = _data?.theme!;
  const modal = _data?.modal!;
  const host_id = post?.host_id;
  const setModal = _data?.setModal!;
  const layoutId = post?.id! + '';
  const { loggedInUser } = useUser();
  const open = modal === 'read' && post;
  const isMyPost = Boolean(host_id === loggedInUser?.id);

  const title = post?.board?.title;
  const board_id = post?.board_id;
  const MoveToBoard = () => {
    if (board_id && title) router.push(`/board/${board_id}/${title}`);
  };

  return (
    <>
      {open && (
        <>
          <PostModal
            exit="exit"
            initial="initial"
            animate="animate"
            custom={theme}
            variants={postVar}
            layoutId={layoutId}
            className="post-modal"
          >
            <Setting
              theme={theme}
              host_id={host_id}
              isMyPost={isMyPost}
              setModal={setModal}
            />
            <motion.img alt="post image" src={avatarLink(post?.post_image)} />
            <Info theme={theme} post={post} />
          </PostModal>
          <OverlayBg dark={0.3} closeModal={() => setModal('')} />
        </>
      )}
    </>
  );
};
