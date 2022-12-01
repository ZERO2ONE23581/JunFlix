import { Setting } from './Setting';
import { motion } from 'framer-motion';
import { PostComment } from '../../../Comment';
import { Dispatch, SetStateAction, useState } from 'react';
import { IPostType } from '../../../../types/post';
import { avatarLink } from '../../../../Tools/Avatar/indexxx';
import { OverlayBg } from '../../../../Tools/overlay';
import { useUser } from '../../../../libs/client/useUser';
import { PostModal, postVar } from '../../../../../styles/post';
import styled from '@emotion/styled';
import { FlexCol } from '../../../../../styles/global';
import { Icons } from './Info/Icons';
import { Host } from './Info/Host';
import { Detail } from './Info/Detail';
import { variants } from '../../../../../styles/variants';
import { CommentModal } from '../../../Comment/Modal';

export interface IReadPost {
  _data: {
    theme: boolean;
    post: IPostType;
    modal: string;
    setModal: Dispatch<SetStateAction<string>>;
  };
}
export const ReadPost = ({ _data }: IReadPost) => {
  const { post, theme, modal, setModal } = _data;
  const post_id = post?.id!;
  const host_id = post?.host_id!;
  const layoutId = post?.id! + '';
  const { loggedInUser } = useUser();
  const isMyPost = Boolean(host_id === loggedInUser?.id);
  const [cmtModal, setCmtModal] = useState(false);
  const open = modal === 'read' && post && !cmtModal;
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
            <Info
              custom={theme}
              className="info"
              animate="animate"
              variants={variants}
            >
              <Icons _data={{ theme, post, setCmtModal }} />
              <Host theme={theme} post={post} />
              <Detail post={post} />
            </Info>

            <PostComment
              _data={{
                theme,
                host_id,
                post_id,
                setCmtModal,
                setPost: setModal,
              }}
            />
          </PostModal>
          <OverlayBg dark={0.3} closeModal={() => setModal('')} />
        </>
      )}
      {cmtModal && (
        <CommentModal
          _data={{
            layoutId,
            theme,
            post_id,
            host_id,
            setCmtModal,
            setPost: setModal,
          }}
        />
      )}
    </>
  );
};
const Info = styled(FlexCol)`
  gap: 20px;
  height: 100%;
  //min-height: 55vh;
  padding-bottom: 0;
  padding: 1rem 1.5rem;
`;
