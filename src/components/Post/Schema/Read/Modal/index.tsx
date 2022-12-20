import { Info } from './Info';
import styled from '@emotion/styled';
import { Setting } from '../Setting';
import { PostCmt } from '../PostCmt';
import { motion } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import { IPostType } from '../../../../../types/post';
import { OverlayBg } from '../../../../../Tools/Overlay';
import { avatarLink } from '../../../../../Tools/Avatar';
import { ISetFixed } from '../../../../../../pages/_app';
import { useUser } from '../../../../../libs/client/useUser';
import { PostModal, postVar } from '../../../../../../styles/post';

export interface IReadPostModal extends ISetFixed {
  _data: {
    theme: boolean;
    post: IPostType;
    layoutId: string;
  };
  _modal: {
    modal: boolean;
    setModal: Dispatch<SetStateAction<string>>;
    setCmtModal: Dispatch<SetStateAction<boolean>>;
  };
}
export const ReadPost = ({ _data, _modal, setFixed }: IReadPostModal) => {
  const { loggedInUser } = useUser();
  const { layoutId, post, theme } = _data;
  const { modal, setModal, setCmtModal } = _modal;
  const host_id = post?.host_id!;
  const isCmtBlocked = post?.onPrivate!;
  const isMyPost = Boolean(host_id === loggedInUser?.id);
  const closeModal = () => {
    setModal('');
    setFixed(false);
  };
  return (
    <>
      {modal && (
        <>
          <Cont
            exit="exit"
            initial="initial"
            animate="animate"
            custom={theme}
            variants={postVar}
            layoutId={layoutId}
          >
            <Setting
              theme={theme}
              host_id={host_id}
              isMyPost={isMyPost}
              setModal={setModal}
            />
            <motion.img alt="post image" src={avatarLink(post?.post_image)} />
            <Info _data={{ theme, post, setCmtModal }} />
            {!isCmtBlocked && (
              <PostCmt _data={{ theme, post, setModal, setCmtModal }} />
            )}
          </Cont>
          <OverlayBg dark={0.3} closeModal={closeModal} />
        </>
      )}
    </>
  );
};
const Cont = styled(PostModal)``;
